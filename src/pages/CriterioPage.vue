<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isLoading" indeterminate color="primary" />

    <q-card-section>
      <q-card-title class="text-h6">{{ nomeDimensao }}</q-card-title>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <div v-for="(pergunta, index) in prepareQuestionario()" v-bind:key="index">
        <div class="q-my-md text-bold text-uppercase">{{ pergunta.categoria }}</div>
        <div v-for="item in pergunta.perguntas" v-bind:key="item.codigo">
          <QuestionarioComponent :criterio="item" @resposta="addResposta" />
        </div>
      </div>
    </q-card-section>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Fechar" to="/ambiente" />
      <q-btn flat color="primary" label="Anterior" @click="irParaAnterior()" />
      <q-btn flat color="primary" label="Próximo" @click="irParaProximo()" />
      <q-btn flat color="primary" :label="hasSubmitted ? 'Salvo' : 'Salvar'" :disable="hasSubmitted"
        @click="enviarFormulario()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios';
import QuestionarioComponent from 'components/QuestionarioComponent.vue';

export default {
  data() {
    return {
      respostas: [],
      questionario: [],
      isLoading: true,
      hasSubmitted: false,
      resposta: '',
      nomeDimensao: '',
    };
  },
  components: {
    QuestionarioComponent,
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    this.getQuestionario(to.params.numero);
    next();
  },
  mounted() {
    this.getQuestionario(this.$route.params.numero);
  },
  methods: {
    filtrarQuestionario(questionario) {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const cargo = localStorage.getItem('apo@usuario_cargo');

      const filtered = questionario.filter((item) => item.edificacoes.includes(edificacao))
        .filter((item) => item.cargos.includes(cargo));

      return filtered;
    },
    getQuestionario(number) {
      this.setNomeDimensao();

      const endpoint = `/criterios/${number}`;

      api.get(endpoint)
        .then((response) => {
          this.questionario = this.filtrarQuestionario(response.data);
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
    addResposta(payload) {
      const index = this.respostas.findIndex((item) => item.criterio === payload.criterio);

      if (index === -1) {
        this.respostas.push(payload);
      } else {
        this.respostas[index] = payload;
      }
    },
    enviarFormulario() {
      const endpoint = '/formularios';
      const ambienteId = localStorage.getItem('apo@ambiente_id');

      const payload = {
        ambiente: ambienteId,
        respostas: this.respostas,
      };

      api.post(endpoint, payload)
        .then(() => {
          this.hasSubmitted = true;
          alert('Formulário salvo com sucesso!');
        })
        .catch((error) => {
          console.log(error);
          alert('Erro ao salvar formulário!');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    irParaProximo() {
      api.get('/dimensoes')
        .then(({ data }) => {
          const { numero } = this.$route.params;
          const filter = data.filter((item) => item.grupo === 'Gestão e Projeto');
          const proximo = filter.find((item) => item.numero > numero);

          if (proximo) {
            this.$router.push(`/criterio/${proximo.numero}`);
          }
        });
    },
    irParaAnterior() {
      api.get('/dimensoes')
        .then(({ data }) => {
          const { numero } = this.$route.params;
          const filter = data.filter((item) => item.grupo === 'Gestão e Projeto');
          const index = filter.findIndex((item) => item.numero === numero);
          const anterior = filter.slice(0, index);
          const target = anterior[anterior.length - 1];

          if (target) {
            this.$router.push(`/criterio/${target.numero}`);
          }
        });
    },
    setNomeDimensao() {
      api.get('/dimensoes')
        .then(({ data }) => {
          const { numero } = this.$route.params;
          const dimensao = data.find((item) => item.numero === numero);

          if (dimensao) {
            this.nomeDimensao = dimensao.nome;
          }
        });
    },
  },
};
</script>
