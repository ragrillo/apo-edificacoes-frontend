<template>
  <q-dialog :modelValue="true">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6">Adicionar Ambiente</div>
        <div>Preencha as informações abaixo</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-y-sm">
          <q-input v-model="ambiente.nome" label="Nome do ambiente" />
          <q-select v-model="ambiente.cobertura" label="Tipo do Ambiente" :options="tipoAmbienteOptions" />
          <div class="text-bold q-my-md">Dimensões</div>
          <q-input v-model="ambiente.dimensoes.largura" type="number" label="Largura (m)" @keyup="calcularAreaAmbiente" />
          <q-input v-model="ambiente.dimensoes.comprimento" type="number" label="Comprimento (m)"
            @keyup="calcularAreaAmbiente" />
          <q-input v-model="ambiente.dimensoes.peDireito" type="number" label="Pé Direito (m)" />
          <q-input v-model="ambiente.areaAmbiente" readonly type="number" label="Área Total (m²)" />

          <div class="text-bold q-my-md">Janelas</div>
          <div class="text-bold q-my-md">Portas</div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancelar" />
        <q-btn flat color="primary" label="Salvar" :loading="loading" @click="salvarUnidade" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { api } from '../boot/axios';

const tipoAmbienteOptions = ['Coberto', 'Descoberto'];

const ambiente = {
  unidade: '',
  nome: '',
  grupo: '',
  cobertura: '',
  dimensoes: {
    largura: null,
    comprimento: null,
    peDireito: null,
  },
  areaAmbiente: 0,
  areaEsquadrias: 0,
  janelas: [],
  portas: [],
};

export default {
  props: {
    unidade: {
      type: String,
      required: true,
    },
    ambienteSelecionado: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ambiente,
      tipoAmbienteOptions,
      isLoading: false,
    };
  },
  mounted() {
    this.setUnidadeId();
  },
  methods: {
    setUnidadeId() {
      const { id } = this.$route.params;
      this.ambiente.unidade = id;
    },
    calcularAreaAmbiente() {
      const { largura, comprimento } = this.ambiente.dimensoes;
      this.ambiente.areaAmbiente = largura * comprimento;
    },
    async salvarUnidade() {
      this.isLoading = true;
      const payload = this.ambiente;
      await api.post('/ambientes', payload);
      this.isLoading = false;
    },
  },
};
</script>
