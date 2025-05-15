import {inject, Injectable, NgZone, OnDestroy, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment.prod';


export interface NotificationDTO {
    id: string;
    title: string;
    message: string;
    reportId: string;
    type: 'NEW_REPORT' | 'COMMENT' | 'STATUS_CHANGE';
    createdAt: string;
    read: boolean;
}

@Injectable({providedIn: 'root'})
export class UserNotificationService implements OnDestroy {
    private readonly storageKey = 'app_notifications';
    private readonly zone = inject(NgZone);
    private readonly authService = inject(AuthService);
    private eventSource: EventSource | null = null;
    private platformId = inject(PLATFORM_ID);


    private readonly notificationsSubject =
        new BehaviorSubject<NotificationDTO[]>(this.loadFromStorage());

    readonly notifications$ = this.notificationsSubject.asObservable();

    constructor() {
        this.authService.getAuthStatus().subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.safeStart();
            } else {
                this.disconnect();
                this.clearNotifications();
            }
        });
    }

    /** Inicia la conexión SSE de forma segura */
    safeStart(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        try {
            this.disconnect(); // Asegura que no haya conexiones previas
            this.requestNotificationPermission();
            this.connectToSse();
        } catch (err) {
            console.warn('No se pudo iniciar SSE de notificaciones:', err);
        }
    }

    private connectToSse(): void {
        if (this.eventSource || !isPlatformBrowser(this.platformId)) return;

        this.eventSource = new EventSource(
            `${environment.urlBack}/notifications/subscribe`,
            {withCredentials: true}
        );

        this.eventSource.addEventListener('new-notification', (event: MessageEvent) => {
            this.zone.run(() => {
                const notification = this.parseNotification(event.data);
                if (notification) {
                    this.addNotification(notification);
                    this.showBrowserNotification(notification);
                }
            });
        });

        this.eventSource.onerror = (error) => {
            console.error('Error en conexión SSE:', error);
            this.reconnect();
        };
    }

    private reconnect(): void {
        this.disconnect();
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.safeStart(), 5000);
        }
    }

    private disconnect(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    private parseNotification(data: string): NotificationDTO | null {
        try {
            const obj = JSON.parse(data);
            if (obj?.title && obj?.message && obj?.reportId && obj?.type && obj?.createdAt) {
                return {
                    id: obj.id || Date.now().toString(),
                    title: obj.title,
                    message: obj.message,
                    reportId: obj.reportId,
                    type: obj.type,
                    createdAt: obj.createdAt,
                    read: false
                };
            }
        } catch (error) {
            console.error('Error parsing notification:', error);
        }
        return null;
    }

    private addNotification(notification: NotificationDTO): void {
        const current = [notification, ...this.notificationsSubject.value];
        this.notificationsSubject.next(current);
        this.saveToStorage(current);
    }

    private loadFromStorage(): NotificationDTO[] {
        try {
            if (isPlatformBrowser(this.platformId)) {

                return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
            } else {
                console.warn('localStorage no está disponible');
                return [];
            }

        } catch (error) {
            console.error('Error loading notifications from storage:', error);
            return [];
        }
    }

    private saveToStorage(notifications: NotificationDTO[]): void {
        try {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(this.storageKey, JSON.stringify(notifications));
            }
        } catch (error) {
            console.error('Error saving notifications to storage:', error);
        }
    }

    private requestNotificationPermission(): void {
        if (isPlatformBrowser(this.platformId) && 'Notification' in window && Notification.permission !== 'denied') {
            {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        console.log('Notification permission granted');
                    }
                });
            }
        }
    }

    private showBrowserNotification(notification: NotificationDTO): void {
        if (Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: this.getNotificationIcon(notification.type),
                data: {reportId: notification.reportId}
            });
        }
    }

    getNotificationIcon(type: 'NEW_REPORT' | 'COMMENT' | 'STATUS_CHANGE'): string {
        const icons: Record<'NEW_REPORT' | 'COMMENT' | 'STATUS_CHANGE', string> = {
            'NEW_REPORT': 'map_marker.png',
            'COMMENT': 'comment.png',
            'STATUS_CHANGE': 'status-change.png'
        };
        return icons[type] || 'assets/icons/notification.png';
    }

    markAsRead(notificationId: string): void {
        const updated = this.notificationsSubject.value.map(n =>
            n.id === notificationId ? {...n, read: true} : n
        );
        this.notificationsSubject.next(updated);
        this.saveToStorage(updated);
    }

    clearNotifications(): void {
        this.notificationsSubject.next([]);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.storageKey);
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }

}