<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isLoading" indeterminate color="primary" />

    <q-card-section>
      <div class="text-bold">{{ nomeUnidade }}</div>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-gutter-y-md">
      <div class="text-bold">Gestão e Projeto</div>
      <q-btn unelevated color="primary" label="Avaliar Gestão e Projeto" @click="mostrarPopUpUnidade()" />
      <q-separator />

      <div class="text-bold">Ambientes</div>
      <q-btn unelevated color="primary" label="Adicionar Ambiente" icon="add" @click="adicionarAmbiente = true" />

      <q-card flat bordered>
        <q-list v-bind:key="index" v-for="(item, index) in ambientes">
          <q-item>
            <q-item-section>
              <q-item-label lines="1">{{ item.nome }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="primary" label="Avaliar" @click="mostrarPopUpAmbiente(item)" />
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-card>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Atualizar" @click="recarregarPagina()" />
      <q-btn flat color="primary" label="Voltar" to="/perfil" />
    </q-card-actions>
  </q-card>

  <PopUpEditarAmbienteVue v-if="adicionarAmbiente" :idUnidade="idUnidade" @close="encerrarEdicao()" />
  <PopUpCriteriosAmbiente v-if="avaliarAmbiente" :ambiente="ambiente" @fecharpopup="avaliarAmbiente = false" />
  <PopUpCriteriosUnidade v-if="avaliarUnidade" :unidade="idUnidade" @fecharpopup="avaliarUnidade = false" />
</template>

<script>
import { api } from '../boot/axios';
import ambientes from '../assets/data/ambientes.json';
import PopUpEditarAmbienteVue from '../components/PopUpEditarAmbiente.vue';
import PopUpCriteriosAmbiente from '../components/QPopUpCriteriosAmbiente.vue';
import PopUpCriteriosUnidade from '../components/QPopUpCriteriosUnidade.vue';

export default {
  components: {
    PopUpEditarAmbienteVue,
    PopUpCriteriosAmbiente,
    PopUpCriteriosUnidade,
  },
  data() {
    return {
      ambientes: [],
      listaAmbientes: [],
      idUnidade: null,
      nomeUnidade: null,
      adicionarAmbiente: false,
      avaliarAmbiente: false,
      avaliarUnidade: false,
      ambiente: null,
      isLoading: true,
    };
  },
  mounted() {
    const idUnidade = localStorage.getItem('apo@unidade_id');
    const edificacao = localStorage.getItem('apo@usuario_edificacao');

    this.getUnidade(idUnidade);
    this.getAmbientes(idUnidade);

    this.idUnidade = idUnidade;
    this.listaAmbientes = ambientes[edificacao];
  },
  methods: {
    async getAmbientes(id) {
      this.isLoading = true;

      const endpoint = `/ambientes/unidade/${id}`;
      const { data } = await api.get(endpoint);

      this.ambientes = data;
      this.isLoading = false;
    },
    async getUnidade(id) {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const endpoint = `/unidades/${edificacao}/${id}`;
      const { data } = await api.get(endpoint);

      this.nomeUnidade = data.nome;
    },
    mostrarPopUpAmbiente(ambiente) {
      this.avaliarAmbiente = true;
      this.ambiente = ambiente;
    },
    mostrarPopUpUnidade() {
      this.avaliarUnidade = true;
    },
    encerrarEdicao() {
      this.adicionarAmbiente = false;
      this.getAmbientes(this.idUnidade);
    },
    recarregarPagina() {
      window.location.reload();
    },
  },
};
</script>
