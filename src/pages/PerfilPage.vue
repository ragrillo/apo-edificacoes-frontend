<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white teste">
      <q-toolbar>
        <q-toolbar-title class="'justify-center'">
          Nome da Empresa
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>

      <q-card class="my-card">
        <q-card-section class="titulo-secao">
          <h1 class="text-h5">Unidades Cadastradas</h1>
          <hr color="#1976d2">
        </q-card-section>
        <CardUnidade v-for="unidade in listaUnidades" :key="unidade.nomeUnidade" v-bind="unidade" />
      </q-card>
      <q-card-section class="column q-gutter-sm">
        <q-btn unelevated label="Adicionar Unidade" class="btn" @click="cadastrarNovaUnidade" />
      </q-card-section>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import CardUnidade from '../components/CardUnidade.vue';
// import { api } from '../boot/axios';

const unidadesList = [
  {
    nomeUnidade: 'Escola Joao',
    responsavel: 'Rafael',
  },
  {
    nomeUnidade: 'Escola Pedro',
    responsavel: 'Rafael',
  },
  {
    nomeUnidade: 'Escola Fran',
    responsavel: 'Rafael',
  },
];

export default defineComponent({
  name: 'PerfilPage',
  components: {
    CardUnidade,
  },
  setup() {
    return {
      listaUnidades: unidadesList,
    };
  },
  methods: {
    async cadastrarNovaUnidade() {
      this.$router.push('unidade');
    },
  },

});
</script>

<style lang="sass" scoped>
.teste
  padding: 10px 15px
  background: #1976d2
  border: 1px solid rgba(86,61,124,.2)
.my-card
  width:100%
.card-unidade
  background: #ecf2ff
  margin-bottom: 10px
.btn
  background: #ffc107
</style>
