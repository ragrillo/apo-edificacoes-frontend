<template>
  <q-select outlined label="Selecione o ambiente" behavior="menu" :options="ambientes" />
</template>

<script>
import { defineComponent } from 'vue';

const example = ['Ambiente 1', 'Ambiente 2'];

export default defineComponent({
  name: 'CriteriosPage',
  data() {
    return {
      ambientes: example,
    };
  },
});
</script>
