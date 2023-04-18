<template>
  <div class="q-my-sm">
    <q-btn v-if="criterio.dica" dense rounded flat icon="info" color="primary" size="sm" />
    {{ criterio.enunciado }}
  </div>
  <div v-for="(value, index) in criterio.opcoesResposta" :key="index">
    <q-radio v-model="resposta" :label="value" :val="value" @update:model-value="enviarResposta(criterio)" />
  </div>
</template>

<script>
export default ({
  emits: ['resposta'],
  props: {
    criterio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      resposta: '',
    };
  },
  methods: {
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
