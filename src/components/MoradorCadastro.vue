<template>
  <q-card-section>
    <div class="q-mb-md text-bold">Informaçẽs sobre Usuário</div>

    <q-form>
      <div class="q-gutter-y-sm">
        <q-select filled readonly v-model="form.edificacao" label="Edificação" behavior="menu" :options="edificacoes" />
        <q-input filled v-model="form.nomeCompleto" label="Nome Completo" />
        <q-input filled v-model="form.telefone" label="Telefone" type="tel" mask="(##) #####-####" />
        <q-input filled v-model="form.email" label="E-mail" type="email" />
        <QInputSenha @senha="obterSenha" />
        <QInputSenha label="Confirmar senha" />
      </div>
    </q-form>

    <QMessageVue v-if="mensagem" :message="mensagem" :type="tipoMensagem" />
  </q-card-section>

  <q-card-actions align="right">
    <q-btn flat label="Voltar" color="primary" @click="$router.back()" />
    <q-btn flat label="Solicitar Cadastro" color="primary" @click="salvarUsuario()" />
  </q-card-actions>
</template>

<script>
import { api } from '../boot/axios';
import QInputSenha from './QInputSenha.vue';
import QMessageVue from './QMessage.vue';
import edificacoes from '../assets/data/edificacoes.json';

const usuarioMorador = {
  edificacao: edificacoes[1],
  nomeCompleto: '',
  telefone: '',
  email: '',
  senha: '',
};

export default {
  components: {
    QInputSenha,
    QMessageVue,
  },
  data() {
    return {
      edificacoes,
      form: usuarioMorador,
      mensagem: null,
      tipoMensagem: 'info',
    };
  },
  methods: {
    async salvarUsuario() {
      const payload = {
        ...this.form,
        edificacao: edificacoes[1].value,
      };

      const { data } = await api.post('/usuarios', payload);
      this.mensagem = data;
    },
    obterSenha(senha) {
      this.form.senha = senha;
    },
  },
};
</script>
