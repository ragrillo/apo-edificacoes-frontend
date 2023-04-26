<template>
  <div class="q-my-sm">
    <q-btn v-if="criterio.dica" dense rounded flat icon="info" color="primary" size="sm"
      @click="showDica(true, criterio.enunciado, criterio.dica)" />
    {{ criterio.enunciado }}
  </div>
  <div v-for="(value, index) in criterio.opcoesResposta" :key="index">
    <q-radio v-model="resposta" :label="value" :val="value" @update:model-value="enviarResposta(criterio)" />
  </div>

  <q-dialog v-model="dica.visible">
    <q-card>
      <q-card-section>
        <div class="text-bold q-mb-md">{{ dica.title }}</div>
        {{ dica.message }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" label="Voltar" @click="showDica(false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
      dica: {
        visible: false,
        title: '',
        message: '',
      },
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
    showDica(visible, title, message) {
      this.dica.visible = visible;
      this.dica.title = title;
      this.dica.message = message;
    },
  },
});
</script>
