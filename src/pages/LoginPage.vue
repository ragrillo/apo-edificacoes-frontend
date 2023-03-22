<template>
  <q-page class="flex flex-center justify-center">
    <div id="content" class="q-gutter-y-md">
      <q-form class="q-gutter-y-sm">
        <q-input v-model="email" filled type="email" label="E-mail" />
        <q-input-senha @senha="obterSenha" />

        <div>
          <router-link to="/recuperar">Esqueci minha senha</router-link>
        </div>
      </q-form>

      <div class="column q-gutter-y-sm">
        <q-btn unelevated label="Entrar" color="primary" :loading="isLoading" @click="realizarLogin()" />
        <q-btn outline label="Entrar como Usuário Anônimo" color="primary" disable />
      </div>

      <div>
        <span>Ainda não possui conta? </span>
        <router-link to="/cadastro/usuario">Cadastre-se!</router-link>
      </div>

      <q-message type='error' :message="mensagem" v-if="mensagem" />
    </div>
  </q-page>
</template>

<script>
import { api } from '../boot/axios';
import QInputSenha from '../components/QInputSenha';
import QMessage from '../components/QMessage';

export default {
  data() {
    return {
      email: '',
      senha: '',
      mensagem: '',
      isLoading: false,
    };
  },
  components: {
    QInputSenha,
    QMessage,
  },
  methods: {
    realizarLogin() {
      this.mensagem = '';
      this.isLoading = true;

      const endpoint = '/usuarios/login';

      const payload = {
        email: this.email.trim(),
        senha: this.senha.trim(),
      };

      api.post(endpoint, payload)
        .then(({ data }) => {
          this.iniciarSessao(data);
        })
        .catch(({ response }) => {
          this.mensagem = response.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    iniciarSessao(data) {
      const { token, usuario } = data;
      const { id, cargo, edificacao } = usuario;

      localStorage.setItem('apo@usuario_session', token);
      localStorage.setItem('apo@usuario_id', id);
      localStorage.setItem('apo@usuario_cargo', cargo);
      localStorage.setItem('apo@usuario_edificacao', edificacao);

      this.$router.push('/perfil');
    },
    obterSenha(senha) {
      this.senha = senha;
    },
  },
};
</script>

<style>
#content {
  width: 80%;
  max-width: 400px;
}
</style>
