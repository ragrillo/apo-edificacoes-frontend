<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="text-h6">Cadastros solicitados</div>
        Selecione um cadastro para obter mais informações e alterar seu status
      </q-card-section>

      <q-list separator v-if="usuarios.length > 0">
        <q-item clickable v-ripple v-bind:key="usuario._id" v-for="usuario in usuarios" class="q-pa-md">
          <q-item-section>
            <q-item-label>{{ usuario.nomeCompleto }}</q-item-label>
            <q-item-label caption>{{ usuario.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-chip clickable outline color="primary" :label="usuario.status" @click="isVisible = true" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-section v-else>
        Não há solicitações pendentes
      </q-card-section>
    </q-card>

    <q-dialog v-model="showDetails">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalhes de {{ user.nomeCompleto }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-sm">
          <q-input outlined readonly v-model="user.nomeCompleto" label="Nome" />
          <q-input outlined readonly v-model="user.telefone" label="Telefone" />
          <q-input outlined readonly v-model="user.email" label="Email" />
          <q-input outlined readonly v-model="user.cargo" label="Cargo" />
          <q-input outlined readonly v-model="user.edificacao" v-show="user.edificacao" label="Edificação" />
          <q-input outlined readonly v-model="user.status" label="Status" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isVisible">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Atualizar registro</div>
          <span>Deseja ativar o registro de {{ nomeCompleto }}?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" label="Cancelar" @click="isVisible = false" />
          <q-btn flat color="primary" label="Confirmar" :loading="isLoading" @click="updateStatus()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';

export default defineComponent({
  data() {
    return {
      usuario: {},
      usuarios: [],
      isVisible: false,
      isLoading: false,
      showDetails: false,
    };
  },
  mounted() {
    this.requestUsers();
  },
  methods: {

    async requestUsers() {
      const { data } = await api.get('/usuario');
      this.usuarios = data.body;
    },
  },
});
</script>
