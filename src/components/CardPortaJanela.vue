<template>
  <q-card flat bordered>
    <q-card-section class="full-width row  justify-between items-center content-center">
      <div class="column items-center">
        <div class="text-bold">Altura</div>
        <div>{{ altura.toFixed(2) }} m</div>
      </div>
      <div class="column items-center">
        <div class="text-bold">Largura</div>
        <div> {{ largura.toFixed(2) }} m</div>
      </div>
      <div class="column items-center" v-if="ventilacao != null">
        <div class="text-bold">Ventilação</div>
        <div>{{ ventilacao.toFixed(2) }} m²</div>
      </div>
      <div class="column items-center" v-if="fachada != null">
        <div class="text-bold">Fachada</div>
        <div>{{ fachada ? 'Sim' : 'Não' }}</div>
      </div>
      <div class="column items-center">
        <div class="text-bold">Área</div>
        <div>{{ areaJanela.toFixed(2) }} m²</div>
      </div>
      <div class="column items-center">
        <q-btn rounded dense flat color="primary" icon="delete" @click="apagarEsquadria()" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardEsquadria',
  emits: ['apagarEsquadria'],
  props: {
    nomeEsquadria: {
      type: String,
      required: true,
    },

    altura: {
      type: Number,
      default: 0,
    },
    largura: {
      type: Number,
      default: 0,
    },
    ventilacao: {
      type: Number,

    },
    fachada: {
      type: Boolean,

    },
    areaJanela: {
      type: Number,
    },
  },
  data() {
    return {
      token: {},
    };
  },
  methods: {
    apagarEsquadria() {
      this.$emit('apagarEsquadria');
    },
  },
});
</script>
