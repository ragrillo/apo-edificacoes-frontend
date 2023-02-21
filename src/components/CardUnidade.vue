<template>
  <q-card-section class="card-unidade full-width row  justify-between items-center content-center">
    <q-card-section>
      <div class=" text-h6">{{ nomeUnidade }}</div>
      <div class="text-subtitle2">{{ responsavel }}</div>
    </q-card-section>
    <q-card-actions class="right">
      <q-btn no-caps class="btn-unidade" to="/unidade">Editar</q-btn>
      <q-btn no-caps class="btn-unidade" to="/criterio">Avaliar</q-btn>
    </q-card-actions>
  </q-card-section>
</template>

<script>
import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';

export default defineComponent({
  name: 'CardUnidade',
  props: {
    nomeUnidade: {
      type: String,
      required: true,
    },

    responsavel: {
      type: String,
      default: '',
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
});

</script>

<style lang="sass" scoped>

.card-unidade
  background: #ecf2ff
  margin-bottom: 10px

.btn-unidade
  padding: 1.5em
  margin-right: 3em
</style>
