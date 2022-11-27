<template>
  <q-header>
    <q-toolbar class="justify-between" />
  </q-header>

  <q-card clickable @click="goToCriterios()" v-ripple class="q-ma-md">
    <q-card-section class="flex justify-between q-py-lg">
      <q-circular-progress
        show-value
        size="75px"
        color="primary"
        track-color="grey-3"
        :value="calcularProgressoTotal"
      >
        {{ calcularProgressoTotal }}%
      </q-circular-progress>
      <div>
        <div align="right" class="text-bold">{{ totalCriteriosCompletos }} de 21 critérios concluídos</div>
        <div align="right">Clique para responder</div>
      </div>
    </q-card-section>
  </q-card>

  <q-fab class="fab" color="primary" direction="up">
    <q-fab-action
    label="Ambiente"
    to="/cadenviroments"
    external-label
    label-position="left"
    icon="chair"
  />
  <q-fab-action
    label="Unidade"
    to="/unidade"
    external-label
    label-position="left"
    icon="home"
  />
  </q-fab>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      totalCriteriosCompletos: 15,
    };
  },
  methods: {
    goToCriterios() {
      window.location.href = '/#/criterios';
    },
  },
  computed: {
    calcularProgressoTotal: () => Math.floor((15 / 21) * 100),
  },
});
</script>

<style>
.fab {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
