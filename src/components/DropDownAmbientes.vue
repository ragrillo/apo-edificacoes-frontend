<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="primary" label="Escolha o Ambiente" ref="teste">
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick(items)" v-for="(items, index) in ambientes" :key="index">
          <q-item-section>
            {{ items }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import ambiente from '../assets/data/ambientes.json';

export default defineComponent({
  name: 'DropDownAmbiente',
  emits: ['ambienteSelecionado'],
  data() {
    return {
      ambientes: [],
      ambienteSelecionado: '',
    };
  },
  mounted() {
    const token = localStorage.getItem('apo@session');
    this.token = VueJwtDecode.decode(token);
    this.ambientes = ambiente[this.token.edificacao];
  },
  methods: {
    onItemClick(itemSelecionado) {
      this.$emit('ambienteSelecionado', itemSelecionado);
      console.log(this.$refs.teste.label);
    },
  },
});
</script>
