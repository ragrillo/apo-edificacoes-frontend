<template>
  <q-card-section class="card-unidade">
    <div class="text-h6">{{ nomeUnidade }}</div>
    <div class="text-subtitle2">{{ responsavel }}</div>
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

</style>
