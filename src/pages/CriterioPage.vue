<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isLoading" indeterminate color="primary" />

    <q-card-section>
      <q-card-title class="text-h6">Critério</q-card-title>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <div v-for="(pergunta, index) in prepareQuestionario()" v-bind:key="index">
        <div class="q-my-md text-bold text-uppercase">{{ pergunta.categoria }}</div>
        <div v-for="item in pergunta.perguntas" v-bind:key="item.codigo">
          <div class="q-my-sm">{{ item.enunciado }}</div>
          <div v-for="(value, index) in item.opcoesResposta" :key="index">
            <q-radio v-model="resposta" :label="value" :val="value" />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Fechar" />
      <q-btn flat color="primary" label="Anterior" />
      <q-btn flat color="primary" label="Próximo" />
      <q-btn flat color="primary" label="Salvar" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios';

export default {
  data() {
    return {
      isLoading: true,
      questionario: [],
    };
  },
  mounted() {
    const { numero } = this.$route.params;
    this.getQuestionario(numero);
    this.isLoading = false;
  },
  methods: {
    getQuestionario(number) {
      const endpoint = `/criterios/${number}`;

      api.get(endpoint)
        .then((response) => {
          this.questionario = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    prepareQuestionario() {
      const questionario = [];

      this.questionario.forEach((pergunta) => {
        const categoria = questionario.find((item) => item.categoria === pergunta.categoria);

        if (categoria) {
          categoria.perguntas.push(pergunta);
        } else {
          questionario.push({
            categoria: pergunta.categoria,
            perguntas: [pergunta],
          });
        }
      });

      return questionario;
    },
  },
};
</script>
