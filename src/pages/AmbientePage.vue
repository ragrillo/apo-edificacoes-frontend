<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Cadastro de Ambiente</div>
      Preencha as informações abaixo.
    </q-card-section>
    <q-card-section class="titulo-secao">
      <h1 class="text-h6">Selecione um Ambiente para cadastrar</h1>
      <hr color="#1976d2">
    </q-card-section>
    <DropDownAmbientes @ambienteSelecionado="addAmbiente" />

    <q-card-section class="titulo-secao">
      <h1 class="text-h6">Ambientes cadastrados</h1>
      <hr color="#1976d2">
    </q-card-section>

    <div v-show="seAmbienteCadastrado()">
      <CardAmbiente v-for="ambiente in listaAmbiente" :key="ambiente.nomeUnidade" v-bind="ambiente" />
    </div>

    <div class="row justify-between">
      <q-card-actions align="right">
        <q-btn flat color="primary" label="Adicionar Ambiente" to="/ambiente/editar" />
      </q-card-actions>
      <q-card-actions align="left">
        <q-btn flat color="primary" label="Iniciar Avaliação" @click="addAmbiente" />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import DropDownAmbientes from 'src/components/DropDownAmbientes.vue';
import CardAmbiente from '../components/CardAmbiente.vue';

const ambienteList = [{
  nomeUnidade: 'Escola Joao',
  nomeAmbiente: 'Rafael',
}];

export default defineComponent({
  name: 'AmbientePage',
  components: {
    DropDownAmbientes,
    CardAmbiente,
  },
  data() {
    return {
      token: {},
      ambientes: [],
    };
  },
  setup() {
    return {
      listaAmbiente: ambienteList,
    };
  },
  mounted() {
    const token = localStorage.getItem('apo@session');
    this.token = VueJwtDecode.decode(token);
  },
  methods: {
    addAmbiente(ambienteEscolhido) {
      console.log(ambienteEscolhido, ambienteList.length);
    },
    seAmbienteCadastrado() {
      return ambienteList.length >= 1;
    },
  },
});
</script>
