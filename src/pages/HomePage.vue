<template>
  <div class="q-ma-md">
    <q-card>
      <q-card-section class="flex justify-between q-py-lg">
        <q-circular-progress show-value size="75px" color="primary" track-color="grey-3"
          :value="calcularProgressoTotal">
          {{ calcularProgressoTotal }}%
        </q-circular-progress>

        <div align="right" style="width: 70%">
          <div class="text-bold">{{ totalCriteriosCompletos }} de 21 critérios concluídos</div>
          Vamos realizar a avaliação da sua unidade
        </div>

      </q-card-section>

      <q-tabs v-model="tab" class="text-grey" active-color="primary" indicator-color="primary" align="justify"
        narrow-indicator>
        <q-tab name="geral" label="Aspectos Gerais" />
        <q-tab name="ambientes" label="Ambientes" />
        <q-tab name="projeto" label="Projeto" />
        <q-tab name="gestao" label="Gestão" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="geral">
          <CriteriosPage />
        </q-tab-panel>
        <q-tab-panel name="ambientes">
          <CriteriosPage />
        </q-tab-panel>
        <q-tab-panel name="projeto">
          <CriteriosPage />
        </q-tab-panel>
        <q-tab-panel name="gestao">
          <CriteriosPage />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CriteriosPage from './CriteriosPage.vue';

const criterio = 0;
const example = ['Ambiente 1', 'Ambiente 2'];

export default defineComponent({
  name: 'HomePage',
  components: {
    CriteriosPage,
  },
  data() {
    return {
      tab: 'geral',
      totalCriteriosCompletos: criterio,
      ambientes: example,
    };
  },
  computed: {
    calcularProgressoTotal: () => Math.floor((criterio / 21) * 100),
  },
});
</script>
