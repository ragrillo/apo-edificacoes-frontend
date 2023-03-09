<template>
  <q-page>
    <div class="text-h6">Solicitar cadastro</div>
    <p>Cadastrar uma Empresa ou um Usuário.</p>

    <q-form>
      <q-card-section>
        <div class="text-bold">Tipo de cadastro</div>

        <CadastroSelect @usuarioSelecionado="addUsuario" />

        <EmpresaCadastro v-if="isUsuario('Empresa')" :tipoCadastro="this.usuario" />
        <ColaboradorCadastro v-if="isUsuario('Colaborador')" :tipoCadastro="this.usuario" />
        <MoradorCadastro v-if="isUsuario('Morador')" :tipoCadastro="this.usuario" />
      </q-card-section>
    </q-form>
  </q-page>
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
