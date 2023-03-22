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
      <div class="text-bold q-mb-sm">Ambiente cadastrados</div>

      <div>
        <q-list v-for="ambiente in ambientes" :key="ambiente.nome">
          <q-item>
            <q-item-section>
              <q-item-label>{{ ambiente.nome }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat color="primary" label="Avaliar" @click="mostrarPopUpCriterios(ambiente)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>

  <pop-up-editar-ambiente-vue v-if="ambienteSelecionado" :ambienteSelecionado="ambienteSelecionado" :unidade="unidade"
    @close="encerrarEdicao" />
  <pop-up-criterios-component v-if="avaliarAmbiente" :ambiente="ambiente" @fecharpopup="avaliarAmbiente = false" />
</template>

<script>
import { api } from '../boot/axios';
import ambientes from '../assets/data/ambientes.json';
import PopUpEditarAmbienteVue from '../components/PopUpEditarAmbiente.vue';
import PopUpCriteriosComponent from '../components/PopUpCriteriosComponent.vue';

export default {
  components: {
    PopUpEditarAmbienteVue,
    PopUpCriteriosComponent,
  },
  data() {
    return {
      ambientes: [],
      listaAmbientes: [],
      unidade: null,
      nomeUnidade: null,
      ambienteSelecionado: null,
      avaliarAmbiente: false,
      ambiente: null,
    };
  },
  mounted() {
    const unidadeid = localStorage.getItem('apo@unidade_id');
    const edificacao = localStorage.getItem('apo@usuario_edificacao');

    this.getUnidade(unidadeid);
    this.getAmbientes(unidadeid);

    this.unidade = unidadeid;
    this.listaAmbientes = ambientes[edificacao];
  },
  methods: {
    async getAmbientes(id) {
      const endpoint = `/ambientes/unidade/${id}`;
      const { data } = await api.get(endpoint);

      this.ambientes = data;
    },
    async getUnidade(id) {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const endpoint = `/unidades/${edificacao}/${id}`;
      const { data } = await api.get(endpoint);

      this.nomeUnidade = data.nome;
    },
    mostrarPopUpCriterios(ambiente) {
      this.avaliarAmbiente = true;
      this.ambiente = ambiente;
    },
    encerrarEdicao() {
      this.ambienteSelecionado = null;
      this.getAmbientes(this.unidade);
    },
  },
};
</script>
