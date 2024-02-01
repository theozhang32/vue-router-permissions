import { MockMethod, MockConfig } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    timeout: 300,
    response: () => ({
      ret: 0,
      data: {
        id: Mock.Random.guid(),
        permissions: ['scope.userLocation', 'scope.userFuzzyLocation'],
      },
    }),
  },
  {
    url: '/api/permission',
    method: 'get',
    timeout: 500,
    response: () => ({
      ret: 0,
      data: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          meta: {
            // permissions: ['scope:dashboard'],
          },
        },
        {
          path: '/nest',
          children: [
            {
              path: '',
              redirect: {},
            },
            {
              path: 'list',
              name: 'NestList',
              meta: {
                permissions: [],
              },
            },
            {
              path: 'upload',
              children: [
                {
                  path: 'photo',
                  name: 'NestUploadPhoto',
                  meta: {},
                },
                {
                  path: 'video',
                  name: 'NestUploadVideo',
                  meta: {},
                },
              ],
            },
            {
              path: 'detail/:id',
              name: 'NestDetailId',
              meta: {
                // permissions: ['scope:detail'],
              },
            },
          ],
        },
      ],
    }),
  },
] as MockMethod[];
