<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-bold">{{ nomeUnidade }}</div>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-gutter-y-md">
      <div class="text-bold">Gestão e Projeto</div>
      <q-btn unelevated color="primary" label="Avaliar Gestão e Projeto" @click="mostrarPopUpUnidade()" />
      <q-separator />

      <div class="text-bold">Ambientes</div>
      <q-btn unelevated color="primary" label="Adicionar Ambiente" icon="add" />

      <q-card flat bordered>
        <q-list v-bind:key="index" v-for="(item, index) in ambientes">
          <q-item>
            <q-item-section>
              <q-item-label lines="1">{{ item.nome }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="primary" label="Avaliar" @click="mostrarPopUpAmbiente(ambiente)" />
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-card>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Voltar" to="/perfil" />
    </q-card-actions>
  </q-card>

  <PopUpEditarAmbienteVue v-if="ambienteSelecionado" :ambienteSelecionado="ambienteSelecionado" :unidade="unidade"
    @close="encerrarEdicao" />
  <PopUpCriteriosAmbiente v-if="avaliarAmbiente" :ambiente="ambiente" @fecharpopup="avaliarAmbiente = false" />
  <PopUpCriteriosUnidade v-if="avaliarUnidade" :unidade="unidade" @fecharpopup="avaliarUnidade = false" />
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
      ambientes: [
        {
          nome: 'Sala de Aula',
        },
        {
          nome: 'Laboratório',
        },
        {
          nome: 'Biblioteca',
        },
        {
          nome: 'Auditório',
        },
        {
          nome: 'Sala de Reunião',
        },
        {
          nome: 'Sala de Estudo',
        },
        {
          nome: 'Sala de Professores',
        },
        {
          nome: 'Sala de Coordenação',
        },
        {
          nome: 'Sala de Direção',
        },
        {
          nome: 'Sala de Secretaria',
        },
        {
          nome: 'Sala de Serviço',
        },
      ],
      listaAmbientes: [],
      unidade: null,
      nomeUnidade: null,
      ambienteSelecionado: null,
      avaliarAmbiente: false,
      avaliarUnidade: false,
      ambiente: null,
    };
  },
  mounted() {
    const unidadeid = localStorage.getItem('apo@unidade_id');
    const edificacao = localStorage.getItem('apo@usuario_edificacao');

    this.getUnidade(unidadeid);
    // this.getAmbientes(unidadeid);

    this.unidade = unidadeid;
    this.listaAmbientes = ambientes[edificacao];
  },
  methods: {
    async getAmbientes(id) {
      const endpoint = `/ambientes/unidade/${id}`;
      const { data } = await api.get(endpoint);

      this.ambientes = data;
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
      this.ambienteSelecionado = null;
      this.getAmbientes(this.unidade);
    },
  },
};
</script>
