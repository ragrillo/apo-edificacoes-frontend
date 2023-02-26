<template>
  <q-select class="select-usuario" v-model="usuarioSelecionado" outlined label="Usuário" behavior="menu"
    :options="listaUsuarios" @update:model-value="enviarUsuario(usuarioSelecionado)" />
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CadastroSelect',
  emits: ['usuarioSelecionado'],
  data() {
    return {
      listaUsuarios: ['Empresa', 'Colaborador', 'Morador'],
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
<style lang="sass" scoped>
.select-usuario
  margin-bottom: 3pc
</style>
