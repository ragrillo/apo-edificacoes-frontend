<template>
  <q-select v-model="empresaSelecionada" filled @update:model-value="escolherEmpresa" label="Empresa" behavior="menu"
    :options="empresas.map((empresa) => empresa.razaoSocial)" />
</template>

<script>
import { api } from '../boot/axios';

export default {
  data() {
    return {
      empresas: [],
      empresaSelecionada: null,
    };
  },
  mounted() {
    this.getEmpresas();
  },
  methods: {
    escolherEmpresa(razaoSocial) {
      const buscaEmpresa = this.empresas.find((empresa) => empresa.razaoSocial === razaoSocial);
      this.$emit('empresaSelecionada', buscaEmpresa._id);
    },
    async getEmpresas() {
      const { data } = await api.get('/empresas');
      this.empresas = data;
    },
  },
};
</script>
