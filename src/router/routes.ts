import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/home',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '/signin',
        component: () => import('pages/SignInPage.vue'),
      },
      {
        path: '/admin',
        component: () => import('pages/AdminPage.vue'),
      },
      {
        path: '/unidade',
        component: () => import('pages/UnidadePage.vue'),
      },
      {
        path: '/ambiente',
        component: () => import('pages/AmbientePage.vue'),
      },
      {
        path: '/ambiente/editar',
        component: () => import('pages/EditarAmbientePage.vue'),
      },
      {
        path: '/criterio/3',
        component: () => import('src/pages/criterios/Acessibilidade.vue'),
      },
      {
        path: '/criterio/4',
        component: () => import('src/pages/criterios/AspectosFisicos.vue'),
      },
      {
        path: '/criterio/6',
        component: () => import('src/pages/criterios/ConfortoUsuarios.vue'),
      },
      {
        path: '/criterio/9',
        component: () => import('src/pages/criterios/ConfortoTermico.vue'),
      },
      {
        path: '/criterio/10',
        component: () => import('src/pages/criterios/ConfortoAcustico.vue'),
      },
      {
        path: '/criterio/11',
        component: () => import('src/pages/criterios/GestaoEManutencao.vue'),
      },
      {
        path: '/criterio/16',
        component: () => import('src/pages/criterios/Custos.vue'),
      },
      {
        path: '/criterio/17',
        component: () => import('src/pages/criterios/LocalUsoEOcupacao.vue'),
      },
      {
        path: '/criterio/19',
        component: () => import('src/pages/criterios/PromocaoESaude.vue'),
      },
      {
        path: '/criterio/20',
        component: () => import('src/pages/criterios/ComunicacaoEUsuario.vue'),
      },
      {
        path: '/criterio/21',
        component: () => import('src/pages/criterios/SociaisECulturas.vue'),
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
