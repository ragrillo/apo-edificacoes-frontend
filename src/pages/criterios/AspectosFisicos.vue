<template>
  <div class="q-ma-lg">
    <div class="q-mb-lg">
      <div class="text-h6">{{ titulo }}</div>
      Responda o questionário abaixo
    </div>

    <q-card>
      <div v-bind:key="index" v-for="(criterio, index) in criterios">
        <q-card-section>
          <div class="text-bold">{{ criterio.toUpperCase() }}</div>
        </q-card-section>

        <q-card-section v-bind:key="index"
          v-for="(pergunta, index) in perguntas.filter((item) => item.group === criterio)">
          <QuestionarioComponent :label="pergunta.label" :type="pergunta.type" :hint="pergunta.hint"
            @onSelect="handleSelection" />

        </q-card-section>
      </div>

      <q-card-actions align="right">
        <q-btn flat label="Concluir" color="primary" @click="submitForm" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import perguntas from '../../data/form/criterio-4.json';
import QuestionarioComponent from '../../components/Questionario.vue';

const titulo = 'ASPECTOS FÍSICOS';

const criterios = [
  'Manutenção',
  'Comunicação Visual',
  'Composição arquitetônica',
  'Uso eficiente do espaço',
  'Mobiliário e ergonomia',
  'Altura do pé direito',
  'Nível de limpeza dos ambientes',
];

const form = [];

export default defineComponent({
  name: 'AspectosFisicos',
  data() {
    return {
      titulo,
      criterios,
      perguntas,
    };
  },
  components: {
    QuestionarioComponent,
  },
  methods: {
    handleSelection(value) {
      form.push(value);
    },
    submitForm() {
      console.log(form);
    },
  },
});
</script>
