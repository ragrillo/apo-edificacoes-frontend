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
      {
        path: '/criterio/2',
        component: () => import('src/pages/criterios/Documentacao.vue'),
      },
      {
        path: '/criterio/1',
        component: () => import('src/pages/criterios/MateriaiseAcabamentosPage1.vue'),
      },
      {
        path: '/criterio/5',
        component: () => import('src/pages/criterios/EspacosPage.vue'),
      },
      {
        path: '/criterio/8',
        component: () => import('src/pages/criterios/QualidadedoArPage1.vue'),
      },
      {
        path: '/criterio/12',
        component: () => import('src/pages/criterios/SegurancaEstruturalPage.vue'),
      },
      {
        path: '/criterio/22',
        component: () => import('src/pages/criterios/SegurancaEstruturalPage.vue'),
      },
      {
        path: '/criterio/14',
        component: () => import('src/pages/criterios/InstalacoesHidraulicasPage.vue'),
      },
      {
        path: '/criterio/15',
        component: () => import('src/pages/criterios/SustentabilidadePage.vue'),
      },
      {
        path: '/criterio/18',
        component: () => import('src/pages/criterios/MobilidadePage.vue'),
      },
      {
        path: '/criterio/13',
        component: () => import('src/pages/criterios/InstalacoesEletricasPage.vue'),
      },
      {
        path: '/criterio/7',
        component: () => import('src/pages/criterios/ConfortoVisualPage.vue'),
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
