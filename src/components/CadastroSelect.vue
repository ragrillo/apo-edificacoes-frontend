<template>
  <q-select class="q-my-sm" v-model="usuarioSelecionado" filled label="Usuário" behavior="menu" :options="listaUsuarios"
    @update:model-value="enviarUsuario(usuarioSelecionado)" />
</template>

<script>
import { defineComponent, ref } from 'vue';

const listaUsuarios = ['Empresa', 'Colaborador', 'Morador'];

export default defineComponent({
  data() {
    return {
      listaUsuarios,
    };
  },
  setup() {
    return {
      usuarioSelecionado: ref(),
    };
  },
  methods: {
    enviarUsuario(usuarioSelecionado) {
      if (usuarioSelecionado != null) {
        this.$emit('usuarioSelecionado', usuarioSelecionado);
      }
    },
  },
});
</script>
