<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <q-list v-for="criterio in questionario" :key="criterio.codigo">
        <QuestionarioComponent :criterio="criterio" @resposta="registrarResposta" />
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Enviar" @click="enviarRespostas" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { api } from 'boot/axios';
import QuestionarioComponent from 'components/QuestionarioComponent';

export default ({
  data() {
    return {
      respostas: [],
      questionario: [],
    };
  },
  components: {
    QuestionarioComponent,
  },
  mounted() {
    const { numero } = this.$route.params;
    this.getCriterios(numero);
  },
  methods: {
    registrarResposta(criterio) {
      this.respostas.push(criterio);
    },
    async enviarRespostas() {
      const { ambienteid } = this.$route.params;

      const payload = {
        ambiente: ambienteid,
        respostas: this.respostas,
      };

      const endpoint = '/formularios';
      await api.post(endpoint, payload);

      this.$router.back();
    },
    async getCriterios(numero) {
      const endpoint = `/criterios/${numero}`;
      const { data } = await api.get(endpoint);

      this.questionario = data;
    },
  },
});
</script>
