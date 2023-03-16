<template>
  <q-card-section>
    <div class="q-mb-md text-bold">Informaçẽs sobre Empresa</div>

    <q-form>
      <div class="q-gutter-y-sm">
        <q-input filled v-model="empresa.cnpj" label="CNPJ" type="tel" mask="##.###.###/####-##" />
        <q-input filled v-model="empresa.razaoSocial" label="Nome da Empresa" />
        <q-input filled v-model="empresa.telefone" label="DDD + Telefone" mask="(##) #####-####" />
        <FormEnderecoComponentVue :form="empresa.endereco" @endereco="obterEndereco" />
      </div>
    </q-form>

    <QMessageVue v-if="mensagem" :message="mensagem" :type="tipoMensagem" />
  </q-card-section>

  <q-card-actions align="right">
    <q-btn flat label="Voltar" color="primary" @click="$router.back()" />
    <q-btn flat label="Solicitar Cadastro" color="primary" @click="salvarEmpresa(empresa)" />
  </q-card-actions>
</template>

<script>
import { api } from '../boot/axios';
import FormEnderecoComponentVue from './FormEnderecoComponent.vue';
import QMessageVue from './QMessage.vue';

const empresa = {
  cnpj: '',
  razaoSocial: '',
  endereco: {
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  },
  telefone: '',
};

export default {
  name: 'EmpresaCadastro',
  data() {
    return {
      empresa,
      mensagem: null,
      tipoMensagem: 'info',
    };
  },
  components: {
    QMessageVue,
    FormEnderecoComponentVue,
  },
  methods: {
    obterEndereco(endereco) {
      this.empresa.endereco = endereco;
    },
    async salvarEmpresa(payload) {
      const endpoint = '/empresas';

      const { data } = await api.post(endpoint, payload);
      this.mensagem = data;
    },
  },
};

</script>
