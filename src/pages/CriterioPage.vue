<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isCardLoading" indeterminate color="primary" />
    <q-card-section v-else>
      <q-list v-for="criterio in filtrarQuestionario()" :key="criterio.codigo">
        <QuestionarioComponent :criterio="criterio" @resposta="registrarResposta" />
      </q-list>
    </q-card-section>

    <q-card-actions class="justify-between">
      <q-btn flat color="primary" label="Fechar" @click="$router.push('/ambiente')" />
      <div>
        <q-btn flat color="primary" label="Anterior" :disable="isCriterio(1)" @click="irParaCriterioAnterior()" />
        <q-btn flat color="primary" label="Próximo" :loading="isButtonLoading"
          :disable="!isFormularioCheio() || isCriterio(22)" @click="irParaProximoCriterio()" />
        <q-btn flat color="primary" label="Salvar" :loading="isButtonLoading" :disable="!isFormularioCheio()"
          @click="enviarRespostas()" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios';
import QuestionarioComponent from 'components/QuestionarioComponent';

export default ({
  data() {
    return {
      formulario: [],
      questionario: [],
      isCardLoading: true,
      isButtonLoading: false,
    };
  },
  components: {
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
    isFormularioCheio() {
      return this.formulario.length === this.questionario.length - 1;
    },
    async irParaProximoCriterio() {
      const { numero } = this.$route.params;

      const proximoCriterio = `${Number(numero) + 1}`.padStart(2, '0');
      const endpoint = `/criterio/${proximoCriterio}`;

      await this.enviarRespostas();
      this.$router.push(endpoint);
    },
    irParaCriterioAnterior() {
      const { numero } = this.$route.params;

      const criterioAnterior = `${Number(numero) - 1}`.padStart(2, '0');
      const endpoint = `/criterio/${criterioAnterior}`;

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
      await api.post(endpoint, payload);

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
