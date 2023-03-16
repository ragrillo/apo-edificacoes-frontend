<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-h6">Cadastros solicitados</div>
      Selecione um cadastro para obter mais informações e alterar seu status
    </q-card-section>

    <q-list separator v-if="usuarios.length > 0">
      <q-item clickable v-ripple v-bind:key="usuario._id" v-for="usuario in usuarios" class="q-pa-md"
        @click="requestusuario(usuario._id, 'details')">
        <q-item-section>
          <q-item-label>{{ usuario.nomeCompleto }}</q-item-label>
          <q-item-label caption>{{ usuario.email }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip outline color="primary" :label="usuario.status" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-section v-else>
      <div align="center" v-if="isLoading">
        <q-circular-progress indeterminate size="sm" color="primary" />
      </div>
      <div v-else>Não há solicitações pendentes</div>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showDetails">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6">Informações sobre {{ usuario.nomeCompleto }}</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-lg">
        <div class="q-gutter-y-md">
          <q-input outlined readonly v-model="usuario.cargo" label="Cargo" />
          <q-input outlined readonly v-model="usuario.edificacao" v-show="usuario.edificacao" label="Edificação" />
          <q-input outlined readonly v-model="usuario.nomeCompleto" label="Nome Completo" />
          <q-input outlined readonly v-model="usuario.email" label="Email" />
          <q-input outlined readonly v-model="usuario.telefone" label="Telefone" />
        </div>

        <div class="q-gutter-y-md" v-show="isEmpresa(usuario.cargo)">
          <div class="text-bold">Informações sobre {{ usuario.razaoSocial }}</div>

          <q-input outlined readonly v-model="usuario.cnpj" label="CNPJ" />
          <q-input outlined readonly v-model="usuario.razaoSocial" label="Razão Social" />
          <q-input outlined readonly v-model="usuario.emailEmpresarial" label="Email Empresarial" />
          <q-input outlined readonly v-model="usuario.telefoneEmpresarial" label="Telefone Empresarial" />
        </div>

        <q-select outlined v-model="usuario.status" label="Status" behavior="menu" :options="statusOptions" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Voltar" color="primary" @click="showDetails = false" />
        <q-btn flat label="Atualizar" color="primary" :loading="isStatusLoading" @click="updateUsuario(usuario._id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// import VueJwtDecode from 'vue-jwt-decode';
import { defineComponent } from 'vue';
import { api } from '../boot/axios';
import cargos from '../assets/data/descricao-de-cargos.json';

const statusOptions = ['Pendente', 'Ativado', 'Desativado'];

export default defineComponent({
  data() {
    return {
      usuario: {},
      usuarios: [],
      isLoading: false,
      showDetails: false,
      isStatusLoading: false,
      statusOptions,
    };
  },
  mounted() {
    // const token = localStorage.getItem('apo@session');

    // if (!token) {
    //   this.$router.back();
    //   return;
    // }

    // const { cargo } = VueJwtDecode.decode(token);
    // const ADMIN = cargos[0].value;

    // if (cargo !== ADMIN) {
    //   this.$router.back();
    //   return;
    // }

    this.requestusuarios();
  },
  methods: {
    isEmpresa(cargo) {
      return (cargo === cargos[4].value);
    },
    async updateUsuario(id) {
      this.isStatusLoading = true;

      const payload = this.usuario;
      delete payload._id;

      await api.put(`/usuarios/${id}`, payload);

      this.isStatusLoading = false;
      this.showDetails = false;

      this.requestusuarios();
    },
    async requestusuario(id, target) {
      const { data } = await api.get(`/usuarios/${id}`);
      this.usuario = data;

      if (target === 'details') {
        this.showDetails = true;
        this.isVisible = false;
      } else {
        this.showDetails = false;
        this.isVisible = true;
      }
    },
    async requestusuarios() {
      this.isLoading = true;

      const { data } = await api.get('/usuarios');
      this.usuarios = data;

      this.isLoading = false;
    },
  },
});
</script>
