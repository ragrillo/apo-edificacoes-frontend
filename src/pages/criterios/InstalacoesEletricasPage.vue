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

import perguntas from '../../data/form/criterio-13.json';
import QuestionarioComponent from '../../components/Questionario.vue';

const titulo = 'INSTALAÇÕES ELÉTRICAS';
const criterios = [...new Set(perguntas.map((item) => item.group))];
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
    handleSelection(data) {
      if (data.value) {
        if (form.some((item) => item.label === data.label)) {
          form.forEach((item) => {
            if (item.label === data.label) {
              item.value = data.value;
            }
          });
        } else {
          form.push(data);
        }
      }
    },
    submitForm() {
      // console.log(form);
    },
  },
});
</script>
