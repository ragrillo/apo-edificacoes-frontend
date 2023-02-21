<template>
  <q-card-section class="card-Ambiente full-width row  justify-between items-center content-center">
    <q-card-section>
      <div class=" text-h6">{{ nomeAmbiente }}</div>
    </q-card-section>
    <q-card-actions class="right">
      <q-btn no-caps class="btn-Ambiente" to="/Ambiente">Editar</q-btn>
    </q-card-actions>
  </q-card-section>
</template>

<script>
import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';

export default defineComponent({
  name: 'CardAmbiente',
  props: {
    nomeUnidade: {
      type: String,
      required: true,
    },

    nomeAmbiente: {
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

.card-Ambiente
  background: #ecf2ff
  margin-bottom: 10px

.btn-Ambiente
  padding: 1.5em
  margin-right: 3em
</style>
