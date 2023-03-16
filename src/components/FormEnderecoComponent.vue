<template>
  <q-input filled :loading="isCepLoading" color="primary" v-model="endereco.cep" type="tel" label="CEP" mask="##.###-###"
    @keyup="obterCep(endereco.cep)" />

  <q-input filled v-model="endereco.logradouro" label="Logradouro" />
  <q-input filled v-model="endereco.numero" label="Número" />
  <q-input filled v-model="endereco.bairro" label="Bairro" />
  <q-input filled v-model="endereco.cidade" label="Cidade" />
  <q-input filled v-model="endereco.estado" label="Estado" />
</template>

<script>
import estados from '../assets/data/estados.json';

const endereco = {
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
};

export default ({
  props: {
    form: Object,
  },
  data() {
    return {
      endereco,
      isCepLoading: false,
    };
  },
  methods: {
    inserirEndereco(data) {
      const { logradouro, bairro, localidade, uf } = data;

      this.endereco.logradouro = logradouro;
      this.endereco.bairro = bairro;
      this.endereco.cidade = localidade;
      this.endereco.estado = estados[uf];
    },
    async requestCep(cep) {
      const sanitizedCep = cep.replace('-', '').replace('.', '');
      const url = `https://viacep.com.br/ws/${sanitizedCep}/json`;

      const response = await fetch(url);
      const data = await response.json();

      return data;
    },
    async obterCep(cep) {
      if (cep.length === 10) {
        this.isCepLoading = true;

        const data = await this.requestCep(cep);
        this.inserirEndereco(data);
        this.$emit('endereco', this.endereco);

        this.isCepLoading = false;
      }
    },
  },
});
</script>
