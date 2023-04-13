<template>
  <q-card class="q-ma-lg">
    <q-linear-progress v-if="isCardLoading" indeterminate color="primary" />
    <q-card-section v-else>
      <q-list v-for="criterio in filtrarQuestionario()" :key="criterio.codigo">
        <QuestionarioComponent :criterio="criterio" @resposta="registrarResposta" />
      </q-list>
    </q-card-section>
    <q-separator />
    <q-card-actions class="justify-between">
      <q-btn flat color="primary" label="Fechar" @click="$router.push('/ambiente')" />
      <div>
        <q-btn flat color="primary" label="Anterior" @click="irParaCriterioAnterior()" />
        <q-btn flat color="primary" label="Próximo" @click="irParaProximoCriterio()" />
        <q-btn flat color="primary" :label="hasSaved ? 'Concluído' : 'Salvar'" :loading="isButtonLoading"
          :disable="!isFormularioCheio() || hasSaved" @click="enviarRespostas()" />
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
      hasSaved: false,
    };
  },
  components: {
    QuestionarioComponent,
  },
  created() {
    const { numero } = this.$route.params;
    this.getCriterios(numero);
  },
  methods: {
    isCriterio(criterio) {
      const { numero } = this.$route.params;

      return Number(numero) === criterio;
    },
    isFormularioCheio() {
      return this.formulario.length === this.questionario.length;
    },
    async irParaProximoCriterio() {
      // TODO: Verificar se o formulário está cheio
    },
    irParaCriterioAnterior() {
      // TODO: Verificar se o formulário está cheio
    },
    filtrarQuestionario() {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const cargo = localStorage.getItem('apo@usuario_cargo');

      return this.questionario.filter((item) => item.edificacoes.includes(edificacao) && item.cargos.includes(cargo));
    },
    registrarResposta(data) {
      this.formulario.push(data);
    },
    async enviarRespostas() {
      this.isButtonLoading = true;
      const ambienteid = localStorage.getItem('apo@ambiente_id');

      const payload = {
        ambiente: ambienteid,
        respostas: this.formulario,
      };

      const endpoint = '/formularios';
      await api.post(endpoint, payload);

      this.formulario = [];
      this.hasSaved = true;
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
