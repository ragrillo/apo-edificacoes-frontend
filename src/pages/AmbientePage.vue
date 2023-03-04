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

    <SelectAmbiente @ambienteSelecionado="addAmbiente" />
    <PopUpEditarAmbiente v-model="editar" @fecharPopUp="fecharPopUp" :nomeAmbiente="this.ambiente" />

    <q-card-section class="titulo-secao">
      <h1 class="text-h6">Ambientes cadastrados</h1>
      <hr color="#1976d2">
    </q-card-section>

    <div v-show="seAmbienteCadastrado()">
      <CardAmbiente v-for="ambiente in listaAmbiente" :key="ambiente.nomeUnidade" v-bind="ambiente" />
    </div>

    <div class="row justify-between">
      <q-card-actions align="right">
        <q-btn flat color="primary" label="voltar" to="/perfil" />
      </q-card-actions>
      <q-card-actions align="left">
        <q-btn flat color="primary" label="Salvar" to="/perfil" />
      </q-card-actions>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import PopUpEditarAmbiente from 'src/components/PopUpEditarAmbiente.vue';
import CardAmbiente from '../components/CardAmbiente.vue';
import SelectAmbiente from '../components/QselectAmbiente.vue';

const ambienteList = [{}];

export default defineComponent({
  name: 'AmbientePage',
  components: {
    CardAmbiente,
    SelectAmbiente,
    PopUpEditarAmbiente,
  },
  data() {
    return {
      token: {},
      ambientes: [],
      editar: false,
      ambiente: '',
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
      this.ambiente = ambienteEscolhido;
      this.editar = true;
    },
    seAmbienteCadastrado() {
      return ambienteList.length >= 1;
    },
    fecharPopUp(comandoFechar) {
      this.editar = comandoFechar;
    },
  },
});
</script>
