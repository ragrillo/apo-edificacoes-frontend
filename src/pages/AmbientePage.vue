<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-h6">{{ nomeUnidade }}</div>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <div class="text-bold">Adicionar ambiente</div>
      <div>Selecione um ambiente abaixo</div>

      <q-select filled v-model="ambienteSelecionado" :options="listaAmbientes" label="Ambiente" class="q-mt-md"
        behavior="menu" />
    </q-card-section>

    <q-card-section>
      <div class="text-bold">Ambiente cadastrados</div>

      <q-list v-for="ambiente in ambientes" :key="ambiente.nome">
        <q-item class="q-mt-md q-py-sm">
          <q-item-section>
            <q-item-label>{{ ambiente.nome }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat color="primary" label="Avaliar" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>

  <pop-up-editar-ambiente-vue v-if="ambienteSelecionado" :nomeAmbiente="ambienteSelecionado" :unidade="unidade" />
</template>

<script>
import { api } from '../boot/axios';
import ambientes from '../assets/data/ambientes.json';
import PopUpEditarAmbienteVue from '../components/PopUpEditarAmbiente.vue';

export default {
  components: {
    PopUpEditarAmbienteVue,
  },
  data() {
    return {
      ambientes: [{
        nome: 'Sala de Aula',
        telefone: '123456789',
      }],
      unidade: null,
      nomeUnidade: null,
      ambienteSelecionado: null,
      listaAmbientes: [],
    };
  },
  mounted() {
    const { id } = this.$route.params;
    const { edificacao } = this.$store.state.usuario;

    this.getUnidade(id);
    // this.getAmbientes(id);

    this.unidade = id;
    this.listaAmbientes = ambientes[edificacao];
  },
  methods: {
    async getAmbientes(id) {
      const endpoint = `/ambientes/unidade/${id}`;
      const { data } = await api.get(endpoint);

      this.ambientes = data;
    },
    async getUnidade(id) {
      const { edificacao } = this.$store.state.usuario;

      const endpoint = `/unidades/${edificacao}/${id}`;
      const { data } = await api.get(endpoint);

      this.nomeUnidade = data.nome;
    },
  },
};
</script>
