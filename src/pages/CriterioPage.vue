<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isCardLoading" indeterminate color="primary" />
    <q-card-section v-else>
      <q-list v-for="criterio in filtrarQuestionario()" :key="criterio.codigo">
        <QuestionarioComponent :criterio="criterio" @resposta="registrarResposta" />
      </q-list>
    </q-card-section>

    <QMessageVue v-if="mensagem" :message="mensagem" />

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Voltar" @click="$router.back()" />
      <q-btn flat color="primary" label="Enviar" :loading="isButtonLoading" @click="enviarRespostas()"
        :disable="isFormularioVazio()" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios';
import QMessageVue from 'components/QMessage';
import QuestionarioComponent from 'components/QuestionarioComponent';

export default ({
  data() {
    return {
      formulario: [],
      questionario: [],
      isCardLoading: true,
      isButtonLoading: false,
      mensagem: null,
    };
  },
  components: {
    QMessageVue,
    QuestionarioComponent,
  },
  mounted() {
    const { numero } = this.$route.params;
    this.getCriterios(numero);
  },
  methods: {
    isFormularioVazio() {
      return this.formulario.length === 0;
    },
    filtrarQuestionario() {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const cargo = localStorage.getItem('apo@usuario_cargo');

      return this.questionario.filter((item) => item.edificacoes.includes(edificacao) && item.cargos.includes(cargo));
    },
    registrarResposta(data) {
      const index = this.formulario.findIndex((item) => item.criterio === data.criterio);

      if (index === -1) {
        this.formulario.push(data);
      } else {
        this.formulario[index] = data;
      }
    },
    async enviarRespostas() {
      this.isButtonLoading = true;
      const { ambienteid } = this.$route.params;

      const payload = {
        ambiente: ambienteid,
        respostas: this.formulario,
      };

      const endpoint = '/formularios';
      const { data } = await api.post(endpoint, payload);

      this.mensagem = data;
      this.formulario = [];
      this.isButtonLoading = false;
    },
    async getCriterios(numero) {
      const endpoint = `/criterios/${numero}`;
      const { data } = await api.get(endpoint);

      this.questionario = data;
      this.isCardLoading = false;
    },
  },
});
</script>
