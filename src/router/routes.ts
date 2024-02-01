import { type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login.vue'),
    meta: {
      title: '登录',
      layout: 'blank',
    },
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('../pages/forbidden.vue'),
    meta: {
      layout: 'blank',
    },
  },
];

export const catchAllRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/not-found.vue'),
    meta: {
      layout: 'blank',
    },
  },
];

export const permissionRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/dashboard.vue'),
    meta: {
      menu: {
        key: 'dashboard',
        label: '数据看板',
      },
    },
  },
  {
    path: '/nest',
    component: () => import('../pages/nest/_layout.vue'),
    meta: {
      menu: {
        key: 'nest',
        label: '嵌套',
      },
    },
    children: [
      {
        path: '',
        redirect: { name: 'NestList' },
      },
      {
        path: 'list',
        name: 'NestList',
        component: () => import('../pages/nest/list.vue'),
        meta: {
          menu: {
            key: 'nest.list',
            label: '嵌套列表',
          },
        },
      },
      {
        path: 'upload',
        component: () => import('../components/layout/Blank.vue'),
        meta: {
          menu: {
            key: 'nest.upload',
            label: '嵌套上传',
          },
        },
        children: [
          {
            path: '',
            redirect: { name: 'NestUploadPhoto' },
          },
          {
            path: 'photo',
            name: 'NestUploadPhoto',
            component: () => import('../pages/nest/upload/photo.vue'),
            meta: {
              menu: {
                key: 'nest.list.photo',
                label: '嵌套上传照片',
              },
            },
          },
          {
            path: 'video',
            name: 'NestUploadVideo',
            component: () => import('../pages/nest/upload/video.vue'),
            meta: {
              menu: {
                key: 'nest.list.video',
                label: '嵌套上传视频',
              },
            },
          },
        ],
      },
      {
        path: 'detail/:id',
        name: 'NestDetailId',
        component: () => import('../pages/nest/detail.vue'),
        props: true,
        meta: {},
      },
    ],
  },
];
