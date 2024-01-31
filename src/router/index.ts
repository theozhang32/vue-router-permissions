import { type App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export * from './routes';

export const installRouter = (app: App) => {
  app.use(router);
};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    layout?: 'blank' | 'default';
    menu?: {
      key: string;
      label: string;
      iconName?: string;
      includePath?: string[];
    };
    permissions?: string[];
  }
}
