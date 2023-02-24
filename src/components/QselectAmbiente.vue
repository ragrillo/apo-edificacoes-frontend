<template>
  <div class="q-pa-md">
    <q-select v-model="ambienteSelecionado" filled label="Ambientes" :options="ambientes" hint="Selecione um ambiente"
      @update:model-value="enviarAmbiente(ambienteSelecionado)">
    </q-select>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import ambiente from '../assets/data/ambientes.json';

const ambienteSelecionado = ref();

export default defineComponent({
  name: 'SelectAmbiente',
  emits: ['ambienteSelecionado'],
  data() {
    return {
      ambientes: [],
    };
  },
  setup() {
    return {
      ambienteSelecionado,
    };
  },
  mounted() {
    const token = localStorage.getItem('apo@session');
    this.token = VueJwtDecode.decode(token);
    this.ambientes = ambiente[this.token.edificacao];
  },
  methods: {
    enviarAmbiente(ambienteEscolhido) {
      if (ambienteEscolhido != null) {
        this.$emit('ambienteSelecionado', ambienteEscolhido);
      }
    },
  },
});
</script>
