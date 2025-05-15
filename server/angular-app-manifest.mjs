
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/validate-account"
  },
  {
    "renderMode": 2,
    "route": "/map"
  },
  {
    "renderMode": 2,
    "route": "/report/new"
  },
  {
    "renderMode": 0,
    "route": "/report/edit/*"
  },
  {
    "renderMode": 2,
    "route": "/user/edit"
  },
  {
    "renderMode": 2,
    "route": "/user/edit/password"
  },
  {
    "renderMode": 2,
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "route": "/my-reports"
  },
  {
    "renderMode": 2,
    "route": "/reset-password"
  },
  {
    "renderMode": 2,
    "route": "/report-list-admin"
  },
  {
    "renderMode": 2,
    "route": "/report-histories"
  },
  {
    "renderMode": 2,
    "route": "/report-summary"
  },
  {
    "renderMode": 2,
    "route": "/category-list"
  },
  {
    "renderMode": 2,
    "route": "/categories/create"
  },
  {
    "renderMode": 0,
    "route": "/categories/edit/*"
  },
  {
    "renderMode": 2,
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23755, hash: '29b8994090296f5bbc686bd0e30f6c87e6275c56da67a9624c8e0764b9d1c978', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17295, hash: '8d3b671c29e3ed0972bd78b81aa94ab908fa3079852224f3b3d0452ef663dd4b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 34212, hash: '201eb21d5518438b6ad5e31e95286e93ceb6e22eca4f912bb6d11a0f916de968', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'validate-account/index.html': {size: 32695, hash: '6fbff319c64d6c1e1404ba3e3aabf9a32123ebe7f9dcf562985f0250c3d1c982', text: () => import('./assets-chunks/validate-account_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 32113, hash: 'ffa346616091a36eb7bb050a8f52dab2fdd3e64004718158e60115d1fdf1aafc', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'report/new/index.html': {size: 32113, hash: '162e6273db5135fd7291bbdc232196c8ecae5708cc00191e9fce5b08f2748599', text: () => import('./assets-chunks/report_new_index_html.mjs').then(m => m.default)},
    'user/edit/index.html': {size: 32113, hash: 'd6962245e4d90c30dac9ef1c5342e280ebd4c4663de207480fd527e4b925f7a7', text: () => import('./assets-chunks/user_edit_index_html.mjs').then(m => m.default)},
    'map/index.html': {size: 32113, hash: 'ffa346616091a36eb7bb050a8f52dab2fdd3e64004718158e60115d1fdf1aafc', text: () => import('./assets-chunks/map_index_html.mjs').then(m => m.default)},
    'user/edit/password/index.html': {size: 32113, hash: '764dc21fe919a467edc7b7675c995b6d15647a56cbb12a491c62b4a89c10fd19', text: () => import('./assets-chunks/user_edit_password_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 32113, hash: 'f9bf2231e65b5d614c4c7fcf34799f48844e08df0161e49fdd3401362ef2554e', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'my-reports/index.html': {size: 32113, hash: '23b720e2f5a9ff69867acdb180f3ab47fa79fe731cc99e4e18e9d740816c38eb', text: () => import('./assets-chunks/my-reports_index_html.mjs').then(m => m.default)},
    'report-histories/index.html': {size: 32113, hash: '2b640f69edc612f251a9ca06b9520106d93374357a2698c0384a5d56df7ba864', text: () => import('./assets-chunks/report-histories_index_html.mjs').then(m => m.default)},
    'reset-password/index.html': {size: 33571, hash: '74c754f215c295d2b3e4d6980c6c7c24ca532059295bf180f69fd9081a9e3581', text: () => import('./assets-chunks/reset-password_index_html.mjs').then(m => m.default)},
    'report-list-admin/index.html': {size: 32113, hash: '8709e36a7c53cc4ad19dc92938120ba886d44940d6cf5dd1fd0ce241f0259f17', text: () => import('./assets-chunks/report-list-admin_index_html.mjs').then(m => m.default)},
    'report-summary/index.html': {size: 32113, hash: '1133a0d222bd499b52deb19b2185a361831201c5af6c1ba3dc1ac5ed721f38cf', text: () => import('./assets-chunks/report-summary_index_html.mjs').then(m => m.default)},
    'category-list/index.html': {size: 32113, hash: '37b61a044d61c1aa86cb00286d32cb1440bc616d9b32530769bd46f8cc06c11e', text: () => import('./assets-chunks/category-list_index_html.mjs').then(m => m.default)},
    'categories/create/index.html': {size: 32113, hash: '8709e36a7c53cc4ad19dc92938120ba886d44940d6cf5dd1fd0ce241f0259f17', text: () => import('./assets-chunks/categories_create_index_html.mjs').then(m => m.default)},
    'styles-NFR22S6Q.css': {size: 51166, hash: '1b/1GO2Tq6c', text: () => import('./assets-chunks/styles-NFR22S6Q_css.mjs').then(m => m.default)}
  },
};
