import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '/cadastro/usuario',
        component: () => import('pages/CadastrarUsuario.vue'),
      },
      {
        path: '/admin',
        component: () => import('pages/AdminPage.vue'),
      },
      {
        path: '/perfil',
        component: () => import('pages/PerfilPage.vue'),
      },
      {
        path: '/unidade',
        component: () => import('pages/UnidadePage.vue'),
      },
      {
        path: '/unidade/:unidadeid/ambiente',
        component: () => import('pages/AmbientePage.vue'),
      },
      {
        path: '/ambiente/:ambienteid/criterio/:numero',
        component: () => import('pages/CriterioPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
