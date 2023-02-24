<template>
  <q-card-section class="card-Ambiente full-width row  justify-around items-center content-center">
    <div class="column items-center">
      <p>Alt. </p>
      <p>{{ altura }} m</p>
    </div>
    <div class="column items-center">
      <p>Larg.</p>
      <p> {{ largura }} m</p>
    </div>
    <div class="column items-center" v-if="ventilacao != null">
      <p>Vent.</p>
      <p>{{ ventilacao }} m²</p>
    </div>
    <div class="column items-center" v-if="fachada != null">
      <p>Fach.</p>
      <p v-if="fachada != true">Não</p>
      <p v-else>Sim</p>
    </div>
    <div class="column items-center">
      <p>Área</p>
      <p>{{ areaJanela }} m²</p>
    </div>
    <div class="column items-center">
      <q-btn dense outline color="primary" icon="remove" @click="apagarEsquadria()" />
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';

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
  mounted() {
    const token = localStorage.getItem('apo@session');
    this.token = VueJwtDecode.decode(token);
  },
  methods: {
    apagarEsquadria() {
      this.$emit('apagarEsquadria');
    },
  },
});

</script>

<style lang="sass" scoped>

.card-Ambiente
  background: #ecf2ff
  margin-bottom: 10px

.titulo
  font-size: 0.5em
</style>
