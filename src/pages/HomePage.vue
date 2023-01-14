<template>
  <q-tabs class="text-primary" v-model="dimension" @update:model-value="handleDimensionChange">
    <q-tab name="Ambiente" label="Ambiente" />
    <q-tab name="Gestão e Projeto" label="Gestão e Projeto" />
  </q-tabs>

  <q-tab-panels v-model="dimension">
    <q-tab-panel name="Ambiente">
      <q-list v-bind:key="index" v-for="(item, index) in criterios">
        <q-item class="q-py-sm">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat color="primary" label="Responder" @click="this.$router.push(item.link)" />
          </q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-tab-panel>

    <q-tab-panel name="Gestão e Projeto">
      <q-list v-bind:key="index" v-for="(item, index) in criterios">
        <q-item class="q-py-sm">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat color="primary" label="Responder" @click="this.$router.push(item.link)" />
          </q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { defineComponent } from 'vue';
import data from '../data/criterio-dimensao.json';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      criterios: [],
      dimension: 'Ambiente',
    };
  },
  methods: {
    handleDimensionChange() {
      this.criterios = data.filter((item) => item.dimension === this.dimension);
    },
  },
  mounted() {
    this.handleDimensionChange();
  },
});
</script>
