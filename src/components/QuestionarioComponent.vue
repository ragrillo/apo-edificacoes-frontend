<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>{{ criterio.categoria }}</q-item-label>
      <q-item-label class="q-mb-sm">
        <q-btn v-if="criterio.dica" flat rounded dense icon="info" size="sm" color="primary"
          @click="habilitarDica(criterio)" />
        {{ criterio.enunciado }}
      </q-item-label>

      <div v-for="(value, index) in criterio.opcoesResposta" :key="index">
        <q-radio v-model="resposta" :label="value" :val="value" @update:model-value="enviarResposta(criterio)" />
      </div>
    </q-item-section>
  </q-item>

  <q-dialog v-model="dica.visivel">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-bold q-mb-lg">{{ dica.titulo }}</div>
        <div class="text-justify">{{ dica.descricao }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Fechar" @click="desabilitarDica" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
const dica = {
  visivel: false,
  titulo: '',
  descricao: '',
};

export default ({
  props: {
    criterio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dica,
      resposta: '',
    };
  },
  methods: {
    habilitarDica(criterio) {
      this.dica.visivel = true;
      this.dica.titulo = criterio.enunciado;
      this.dica.descricao = criterio.dica;
    },
    desabilitarDica() {
      this.dica.visivel = false;
    },
    enviarResposta(criterio) {
      const payload = {
        criterio: criterio.codigo,
        resposta: this.resposta,
      };

      this.$emit('resposta', payload);
    },
  },
});
</script>
