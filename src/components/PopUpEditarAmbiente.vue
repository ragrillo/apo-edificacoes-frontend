<template>
  <q-dialog v-model="editingMode">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="q-gutter-y-sm">
          <h6>{{ nomeAmbiente }}</h6>
          <div class="q-my-md text-bold">Tipo do Ambiente</div>

          <q-select v-model="ambiente.tipoAmbiente" outlined label="Selecionar" behavior="menu" :options="tipoAmbiente" />

          <div class="q-my-md text-bold">Dimensões</div>

          <q-input v-model="ambiente.dimensoes.largura" outlined label="Largura (m)" type="number" @keyup=calculoArea() />
          <q-input v-model="ambiente.dimensoes.comprimento" outlined label="Comprimento (m)" type="number"
            @keyup=calculoArea() />
          <q-input v-model="ambiente.dimensoes.peDireito" outlined label="Pé Direito (m)" type="number" />
          <q-input v-model="ambiente.dimensoes.areaAmbiente" outlined label="Área Total (m²)" type="number" readonly />

          <div class="q-my-md text-bold">Janelas</div>
          <q-input v-model="larguraJanela" outlined label="Largura (m)" type="number" />
          <q-input v-model="alturaJanela" outlined label="Altura (m)" type="number" />
          <q-input v-model="ventilacao" outlined label="Área de Ventilação(m²)" type="number" />
          <q-checkbox v-model="fachada" outlined label="Instalada na fachada" />

          <div class="q-gutter-sm">
            <q-btn dense outline color="primary" icon="add" @click="adicionarArea('Janela')" />
          </div>

          <div class="q-my-md text-bold" v-if="ambiente.janelas.length != 0">Janelas adicionadas</div>
          <CardEsquadria v-for="(janela, index) in ambiente.janelas" :key="janela.nomeEsquadria" v-bind="janela"
            @apagarEsquadria="apagarEsquadria(index, 'janela')" />

          <div class="q-my-md text-bold">Portas</div>

          <q-input v-model="larguraPorta" outlined label="Largura (m)" type="number" />
          <q-input v-model="alturaPorta" outlined label="Altura (m)" type="number" />

          <div class="q-gutter-sm">
            <q-btn dense outline color="primary" icon="add" @click="adicionarArea('Porta')" />
          </div>

          <div class="q-my-md text-bold" v-if="ambiente.janelas.length != 0">Portas adicionadas</div>
          <CardEsquadria v-for="(porta, index) in ambiente.portas" :key="porta.nomeEsquadria" v-bind="porta"
            @apagarEsquadria="apagarEsquadria(index, 'porta')" />

        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancelar" @click="enableEditingMode()" />
        <q-btn flat color="primary" label="Salvar" @click="salvarAmbiente()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import CardEsquadria from './CardPortaJanela.vue';

const tipoAmbiente = ['Coberto', 'Descoberto'];

export default defineComponent({
  name: 'EditarAmbientePage',
  emits: ['fecharPopUp'],
  components: {
    CardEsquadria,
  },
  props: {
    nomeAmbiente: String,
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
      tipoAmbiente,
      editingMode: true,
      listaJanela: [],
      ambiente: {
        nomeAmbiente: this.nomeAmbiente,
        tipoAmbiente: '',
        dimensoes: {
          largura: '',
          comprimento: '',
          peDireito: '',
          areaAmbiente: Number,
        },

        janelas: [],
        portas: [],
      },
    };
  },
  methods: {
    enableEditingMode() {
      this.$emit('fecharPopUp', false);
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
    salvarAmbiente() {
      this.ambiente.nomeAmbiente = this.nomeAmbiente;
      this.enableEditingMode();
    },
    calculoArea() {
      this.ambiente.dimensoes.areaAmbiente = parseFloat(this.ambiente.dimensoes.largura) * parseFloat(this.ambiente.dimensoes.comprimento);
    },
  },
});
</script>
