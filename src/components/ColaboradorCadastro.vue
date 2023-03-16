<template>
  <q-card-section>
    <div class="q-mb-md text-bold">Informaçẽs sobre Usuário</div>

    <q-form>
      <div class="q-gutter-y-sm">
        <CargoSelect @cargoSelecionado="obterCargo" />
        <EmpresaSelectComponent @empresaSelecionada="obterEmpresaSelecionada" />
        <q-select filled v-model="form.edificacao" label="Edificação" behavior="menu" :options="edificacoes" emit-value
          map-options />
        <q-input filled v-model="form.nomeCompleto" label="Nome Completo" />
        <q-input filled v-model="form.telefone" label="DDD + Telefone" type="tel" mask="(##) #####-####" />
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
import CargoSelect from './CargoSelect.vue';
import EmpresaSelectComponent from './EmpresaSelectComponent.vue';
import QInputSenha from './QInputSenha.vue';
import QMessageVue from './QMessage.vue';
import edificacoes from '../assets/data/edificacoes.json';

const usuarioColaborador = {
  cargo: '',
  empresa: '',
  edificacao: '',
  nomeCompleto: '',
  telefone: '',
  email: '',
  senha: '',
};

export default {
  components: {
    QInputSenha,
    QMessageVue,
    CargoSelect,
    EmpresaSelectComponent,
  },
  data() {
    return {
      edificacoes,
      form: usuarioColaborador,
      mensagem: null,
      tipoMensagem: 'info',
    };
  },
  methods: {
    async salvarUsuario() {
      const payload = {
        ...this.form,
      };

      const { data } = await api.post('/usuarios', payload);
      this.mensagem = data;
    },
    obterSenha(senha) {
      this.form.senha = senha;
    },
    obterCargo(cargo) {
      this.form.cargo = cargo;
    },
    obterEmpresaSelecionada(empresa) {
      this.form.empresa = empresa;
    },
  },
};
</script>
