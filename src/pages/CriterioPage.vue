<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isCardLoading" indeterminate color="primary" />
    <q-card-section v-else>
      <q-list v-for="criterio in filtrarQuestionario()" :key="criterio.codigo">
        <QuestionarioComponent :criterio="criterio" @resposta="registrarResposta" />
      </q-list>
    </q-card-section>

    <QMessageVue v-if="mensagem" :message="mensagem" />

    <q-card-actions class="justify-between">
      <q-btn flat color="primary" label="Voltar" @click="$router.back()" />
      <div>
        <q-btn flat color="primary" label="Próximo" :disable="isCriterio(22)" @click="irParaProximoCriterio()" />
        <q-btn flat color="primary" label="Enviar" :loading="isButtonLoading" :disable="isFormularioVazio()"
          @click="enviarRespostas()" />
      </div>
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
  created() {
    const { numero } = this.$route.params;
    this.getCriterios(numero);
  },
  beforeRouteUpdate(to, from, next) {
    this.isCardLoading = true;
    this.getCriterios(to.params.numero);
    next();
  },
  methods: {
    isCriterio(criterio) {
      const { numero } = this.$route.params;

      return Number(numero) === criterio;
    },
    isFormularioVazio() {
      return this.formulario.length === 0;
    },
    irParaProximoCriterio() {
      const { ambienteid, numero } = this.$route.params;
      const proximoCriterio = `${Number(numero) + 1}`.padStart(2, '0');
      const endpoint = `/ambiente/${ambienteid}/criterio/${proximoCriterio}`;

      this.$router.push(endpoint);
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
