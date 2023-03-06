<template>
  <q-page>
    <q-card class="q-md">
      <q-card-section>
        <div class="text-h6">Solicitar cadastro</div>
        <p>Cadastrar uma Empresa ou um Usuário.</p>
      </q-card-section>

      <q-form class="column q-pa-md">
        <q-card-section class="q-pa-md">
          <div class="text-bold">Selecione o tipo de cadastro</div>
          <CadastroSelect @usuarioSelecionado="addUsuario" />
          <EmpresaCadastro v-if="this.usuario === 'Empresa'" :tipoCadastro="this.usuario" />
          <ColaboradorCadastro v-if="this.usuario === 'Colaborador'" :tipoCadastro="this.usuario" />
          <MoradorCadastro v-if="this.usuario === 'Morador'" :tipoCadastro="this.usuario" />
        </q-card-section>
      </q-form>
    </q-card>
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
  },
});
</script>
