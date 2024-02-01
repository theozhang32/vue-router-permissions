import { type App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { IMenu } from '../types';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export * from './routes';
export * from './guard';

export const installRouter = (app: App) => {
  app.use(router);
};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    layout?: 'blank' | 'default';
    menu?: Partial<IMenu>;
    permissions?: string[];
  }
}
