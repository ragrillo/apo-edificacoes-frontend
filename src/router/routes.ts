import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/signin', component: () => import('pages/SignInPage.vue') },
      { path: '/admin', component: () => import('pages/AdminPage.vue') },
      { path: '/unidade', component: () => import('pages/UnidadePage.vue') },
      { path: '/ambiente', component: () => import('pages/AmbientePage.vue') },
      { path: '/ambiente/editar', component: () => import('pages/EditarAmbientePage.vue') },
      { path: '/criterios', component: () => import('pages/CriteriosPage.vue') },
      { path: '/criterios/7/iluminacao-artificial', component: () => import('src/pages/criterios/conforto-visual/IluminacaoArtificialPage.vue') },
      { path: '/criterios/8/Qualidade-do-Ar', component: () => import('src/pages/criterios/QualidadedoArPage.vue') },
      { path: '/criterios/8/Materiais-e-Acabamentos', component: () => import('src/pages/criterios/MateriaiseAcabamentosPage.vue') },
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
