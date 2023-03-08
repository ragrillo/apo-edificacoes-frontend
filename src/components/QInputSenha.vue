<template>
  <q-input v-model="senha" label="Senha" :type="alterarTipo" @keyup="obterSenha">
    <template v-slot:append>
      <q-btn dense rounded flat @click="mostrarSenha" :icon="alterarIcone" />
    </template>
  </q-input>
</template>

<script>
export default {
  data() {
    return {
      senha: '',
      icone: 'visibility',
      isVisible: false,
    };
  },
  methods: {
    mostrarSenha() {
      this.isVisible = !this.isVisible;
    },
    obterSenha() {
      this.$emit('senha', this.senha);
    },
  },
  computed: {
    alterarTipo() {
      return this.isVisible ? 'text' : 'password';
    },
    alterarIcone() {
      return this.isVisible ? 'visibility_off' : 'visibility';
    },
  },
};
</script>
