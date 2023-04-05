<template>
  <q-dialog :modelValue="show">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6">Adicionar ambiente</div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-gutter-y-sm">
        <div class="q-ma-md text-bold">Infomações básicas</div>
        <q-input v-model="form.nome" filled label="Nome do ambiente" />
        <q-select v-model="form.cobertura" filled label="Tipo do ambiente" behavior="menu" :options="options.cobertura" />
        <div class="q-ma-md text-bold">Dimensões</div>
        <q-input v-model="form.dimensoes.largura" filled label="Largura (m)" type="number"
          @keyup="calcularAreaAmbiente()" />
        <q-input v-model="form.dimensoes.comprimento" filled label="Comprimento (m)" type="number"
          @keyup="calcularAreaAmbiente()" />
        <q-input v-model="form.dimensoes.peDireito" filled label="Pé direito (m)" type="number" />
        <q-input v-model="form.areaAmbiente" filled label="Área Total (m²)" type="number" />

        <div class="text-bold q-my-md">Janelas</div>
        <q-input v-model="larguraJanela" filled label="Largura (m)" type="number" />
        <q-input v-model="alturaJanela" filled label="Altura (m)" type="number" />
        <q-input v-model="ventilacao" filled label="Área de Ventilação(m²)" type="number" />
        <q-checkbox v-model="fachada" filled label="Instalada na fachada" />

        <div>
          <q-btn unelevated label="Adicionar" color="primary" @click="adicionarArea('Janela')" />
        </div>

        <div class="q-ma-md text-bold" v-if="form.janelas.length != 0">Janelas adicionadas</div>
        <CardEsquadria v-for="(janela, index) in form.janelas" :key="janela.nomeEsquadria" v-bind="janela"
          @apagarEsquadria="apagarEsquadria(index, 'janela')" />

        <div class="text-bold q-my-md">Portas</div>
        <q-input v-model="larguraPorta" filled label="Largura (m)" type="number" />
        <q-input v-model="alturaPorta" filled label="Altura (m)" type="number" />
        <div>
          <q-btn unelevated label="Adicionar" color="primary" @click="adicionarArea('Porta')" />
        </div>
        <div class="q-ma-md text-bold" v-if="form.portas.length != 0">Portas adicionadas</div>
        <CardEsquadria v-for="(porta, index) in form.portas" :key="porta.nomeEsquadria" v-bind="porta"
          @apagarEsquadria="apagarEsquadria(index, 'porta')" />
      </q-card-section>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancelar" @click="encerrarEdicao()" />
        <q-btn flat color="primary" label="Salvar" @click="salvarAmbiente()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { api } from '../boot/axios';
import CardEsquadria from './CardPortaJanela.vue';

const options = {
  cobertura: ['Coberto', 'Descoberto'],
};

const form = {
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
  emits: ['close'],
  props: {
    idUnidade: {
      type: String,
      required: true,
    },
  },
  components: {
    CardEsquadria,
  },
  data() {
    return {
      form,
      options,
      show: true,
    };
  },
  setup() {
    return {
      fachada: ref(false),
      larguraJanela: ref(''),
      alturaJanela: ref(''),
      ventilacao: ref(),
      larguraPorta: ref(''),
      alturaPorta: ref(''),
    };
  },
  mounted() {
    this.form.unidade = this.idUnidade;
  },
  methods: {
    adicionarArea(area) {
      if (area === 'Janela') {
        this.form.janelas.push({
          nomeEsquadria: 'janela',
          largura: parseFloat(this.larguraJanela),
          altura: parseFloat(this.alturaJanela),
          ventilacao: parseFloat(this.ventilacao),
          fachada: this.fachada,
          areaJanela: parseFloat(this.larguraJanela) * parseFloat(this.alturaJanela),
        });
        this.larguraJanela = '';
        this.alturaJanela = '';
        this.ventilacao = '';
        this.fachada = false;
      } else {
        this.form.portas.push({
          nomeEsquadria: 'porta',
          largura: parseFloat(this.larguraPorta),
          altura: parseFloat(this.alturaPorta),
          fachada: null,
          areaJanela: parseFloat(this.larguraPorta) * parseFloat(this.alturaPorta),
        });
        this.larguraJanela = '';
        this.alturaJanela = '';
        this.ventilacao = '';
        this.fachada = false;
      }
    },
    apagarEsquadria(index, esquadria) {
      if (esquadria === 'janela') {
        this.form.janelas.splice(index, 1);
      } else {
        this.form.portas.splice(index, 1);
      }
    },
    calcularAreaAmbiente() {
      const { largura, comprimento } = this.form.dimensoes;
      this.form.areaAmbiente = largura * comprimento;
    },
    encerrarEdicao() {
      this.$emit('close');
    },
    async salvarAmbiente() {
      const { largura, comprimento, peDireito } = this.form.dimensoes;

      const payload = {
        ...this.form,
        dimensoes: {
          largura: parseFloat(largura),
          comprimento: parseFloat(comprimento),
          peDireito: parseFloat(peDireito),
        },
      };

      await api.post('/ambientes', payload);

      this.encerrarEdicao();
    },
  },
};
</script>
