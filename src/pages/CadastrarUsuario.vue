<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-h6">Solicitar Cadastro</div>
      <p>Cadastrar um Usuário ou Empresa</p>

      <div class="text-bold">Tipo de Cadastro</div>
      <CadastroSelect @usuarioSelecionado="addUsuario" />
    </q-card-section>

    <EmpresaCadastro v-if="isUsuario('Empresa')" />
    <ColaboradorCadastro v-if="isUsuario('Colaborador')" />
    <MoradorCadastro v-if="isUsuario('Morador')" />
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import CadastroSelect from 'src/components/CadastroSelect.vue';
import EmpresaCadastro from 'src/components/EmpresaCadastro.vue';
import ColaboradorCadastro from 'src/components/ColaboradorCadastro.vue';
import MoradorCadastro from 'src/components/MoradorCadastro.vue';

export default defineComponent({
  name: 'CadastrarUsuario',
  components: {
    CadastroSelect,
    EmpresaCadastro,
    ColaboradorCadastro,
    MoradorCadastro,
  },
  data() {
    return {
      usuario: '',
      message: '',
    };
  },
  methods: {
    addUsuario(usuarioEscolhido) {
      this.usuario = usuarioEscolhido;
    },
    messageResposta(message) {
      this.message = message;
    },
    isUsuario(tipoCadastro) {
      return this.usuario === tipoCadastro;
    },
  },
});
</script>
