<template>
    <q-card class="q-ma-md">
      <q-tabs v-model="tab" active-color="primary" indicator-color="primary">
        <q-tab name="projeto" label="Projeto" />
        <q-tab name="ambiente" label="Ambiente" />
        <q-tab name="gestao" label="Gestão" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="ambiente">
          <CriteriosPage grupo="ambiente" />
        </q-tab-panel>
        <q-tab-panel name="projeto">
          <CriteriosPage grupo="projeto" />
        </q-tab-panel>
        <q-tab-panel name="gestao">
          <CriteriosPage grupo="gestao" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import CriteriosPage from './CriteriosPage.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    CriteriosPage,
  },
  data() {
    return {
      tab: 'gestao',
    };
  },
});
</script>
