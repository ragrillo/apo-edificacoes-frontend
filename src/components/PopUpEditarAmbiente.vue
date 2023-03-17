<template>
  <q-dialog :modelValue="true">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6">Adicionar Ambiente</div>
        <div>Preencha as informações abaixo</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-y-sm">
          <q-input v-model="ambiente.nome" filled label="Nome do ambiente" />
          <q-select v-model="ambiente.cobertura" filled label="Tipo do Ambiente" :options="tipoAmbienteOptions"
            behavior="menu" />

          <div class="text-bold q-my-md">Dimensões</div>
          <q-input v-model="ambiente.dimensoes.largura" filled type="number" label="Largura (m)"
            @keyup="calcularAreaAmbiente" />
          <q-input v-model="ambiente.dimensoes.comprimento" filled type="number" label="Comprimento (m)"
            @keyup="calcularAreaAmbiente" />
          <q-input v-model="ambiente.dimensoes.peDireito" filled type="number" label="Pé Direito (m)" />
          <q-input v-model="ambiente.areaAmbiente" filled readonly type="number" label="Área Total (m²)" />

          <div class="text-bold q-my-md">Janelas</div>
          <q-input v-model="larguraJanela" filled label="Largura (m)" type="number" />
          <q-input v-model="alturaJanela" filled label="Altura (m)" type="number" />
          <q-input v-model="ventilacao" filled label="Área de Ventilação(m²)" type="number" />
          <q-checkbox v-model="fachada" filled label="Instalada na fachada" />

          <div>
            <q-btn label="Adicionar" color="primary" @click="adicionarArea('Janela')" />
          </div>

          <div class="q-my-md text-bold" v-if="ambiente.janelas.length != 0">Janelas adicionadas</div>
          <CardEsquadria v-for="(janela, index) in ambiente.janelas" :key="janela.nomeEsquadria" v-bind="janela"
            @apagarEsquadria="apagarEsquadria(index, 'janela')" />

          <div class="text-bold q-my-md">Portas</div>
          <q-input v-model="larguraPorta" filled label="Largura (m)" type="number" />
          <q-input v-model="alturaPorta" filled label="Altura (m)" type="number" />
          <div>
            <q-btn label="Adicionar" color="primary" @click="adicionarArea('Porta')" />
          </div>
          <div class="q-my-md text-bold" v-if="ambiente.portas.length != 0">Portas adicionadas</div>
          <CardEsquadria v-for="(porta, index) in ambiente.portas" :key="porta.nomeEsquadria" v-bind="porta"
            @apagarEsquadria="apagarEsquadria(index, 'porta')" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancelar" @click="encerrarEdicao" />
        <q-btn flat color="primary" label="Salvar" :loading="loading" @click="salvarUnidade" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import { api } from '../boot/axios';
import CardEsquadria from './CardPortaJanela.vue';

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
  components: {
    CardEsquadria,
  },
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
  data() {
    return {
      ambiente,
      tipoAmbienteOptions,
      isLoading: false,
    };
  },
  mounted() {
    this.setUnidadeId();
    this.ambiente.nome = this.ambienteSelecionado;
  },
  methods: {
    setUnidadeId() {
      this.ambiente.unidade = this.$route.params.unidadeid;
    },
    encerrarEdicao() {
      this.$emit('close');
    },
    calcularAreaAmbiente() {
      const { largura, comprimento } = this.ambiente.dimensoes;
      this.ambiente.areaAmbiente = largura * comprimento;
    },
    adicionarArea(area) {
      if (area === 'Janela') {
        this.ambiente.janelas.push({
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
        this.ambiente.portas.push({
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
        this.ambiente.janelas.splice(index, 1);
      } else {
        this.ambiente.portas.splice(index, 1);
      }
    },
    async salvarUnidade() {
      this.isLoading = true;

      const payload = this.ambiente;
      await api.post('/ambientes', payload);

      this.isLoading = false;
      this.limparFormulario();
      this.encerrarEdicao();
    },
    limparFormulario() {
      this.ambiente.dimensoes.comprimento = '';
      this.ambiente.dimensoes.largura = '';
      this.ambiente.dimensoes.peDireito = '';
      this.ambiente.cobertura = '';
      this.ambiente.areaAmbiente = '';
      this.ambiente.areaEsquadrias = '';
      this.ambiente.nome = '';
      this.ambiente.janelas.length = 0;
      this.ambiente.portas.length = 0;
    },
  },
};
</script>
