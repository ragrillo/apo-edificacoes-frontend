<template>
  <q-page class="flex flex-center justify-center">
    <div id="content" class="column q-gutter-y-md">
      <q-form class="q-gutter-y-md">
        <q-input v-model="email" type="email" label="E-mail" />
        <q-input-senha @senha="obterSenha" />

        <div>
          <router-link to="/recuperar">Esqueci minha senha</router-link>
        </div>
      </q-form>

      <q-btn label="Entrar" color="primary" :loading="isLoading" @click="realizarLogin()" />

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
        });

      this.isLoading = false;
    },
    iniciarSessao(data) {
      const { token, usuario } = data;

      localStorage.setItem('apo@session', token);

      this.$store.commit('setToken', token);
      this.$store.commit('setUsuario', usuario);

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
