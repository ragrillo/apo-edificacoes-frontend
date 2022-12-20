<template>
    <div v-if="isFetching" align="center">
      <q-circular-progress color="primary" size="md" indeterminate />
    </div>

    <q-list v-else separator>
      <q-item v-bind:key="index" v-for="(criterio, index) of criterios">
        <q-item-section class="q-py-md">
          <q-item-label class="text-bold">{{ criterio.subtitulo }}</q-item-label>
          <q-item-label caption>{{ criterio.titulo }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';

export default defineComponent({
  name: 'CriteriosPage',
  props: ['grupo'],
  data() {
    return {
      criterios: [],
      isFetching: false,
    };
  },
  async created() {
    this.isFetching = true;
    const { data } = await api.get(`/criterio?grupo=${this.grupo}`);
    this.criterios = data.body;
    this.isFetching = false;
  },
});
</script>
