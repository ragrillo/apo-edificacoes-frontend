<template>
  <q-tabs class="text-primary" v-model="dimension" @update:model-value="handleDimensionChange">
    <q-tab name="Ambiente" label="Ambiente" />
    <q-tab name="Gestão e Projeto" label="Gestão e Projeto" />
  </q-tabs>
  <SelectAmbiente @ambienteSelecionado="addAmbiente" v-if="this.dimension === 'Ambiente'" />
  <q-tab-panels v-model="dimension">
    <q-tab-panel name="Ambiente">
      <q-list v-bind:key="index" v-for="(item, index) in criterios">
        <q-item class="q-py-sm">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat color="primary" label="Responder" :disable="ambiente === ''" @click="
              this.$router.push(item.link)" />
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
            <q-btn flat color="primary" label=" Responder" @click="this.$router.push(item.link)" />
          </q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-tab-panel>
  </q-tab-panels>
  <div class="row justify-between">
    <q-card-actions align="right">
      <q-btn flat color="primary" label="voltar" @click="imprimeConsole()" />
    </q-card-actions>
    <q-card-actions align="left">
      <q-btn flat color="primary" label="Salvar" @click="imprimeConsole()" />
    </q-card-actions>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import data from '../data/criterio-dimensao.json';
import SelectAmbiente from '../components/QselectAmbiente.vue';

export default defineComponent({
  name: 'CriteriosPage',
  components: { SelectAmbiente },
  data() {
    return {
      criterios: [],
      dimension: 'Ambiente',
      ambiente: '',
    };
  },
  methods: {
    handleDimensionChange() {
      this.criterios = data.filter((item) => item.dimension === this.dimension);
    },
    addAmbiente(ambienteEscolhido) {
      this.ambiente = ambienteEscolhido;
    },
  },
  mounted() {
    this.handleDimensionChange();
  },
});
</script>
