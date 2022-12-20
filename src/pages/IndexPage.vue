<template>
  <q-page class="q-pa-md">
    <q-header>
      <q-toolbar />
    </q-header>

    <q-card>
      <q-card-section>
        <div class="text-h6">Unidades</div>
      </q-card-section>

      <q-card-section>
        <div v-if="isFetching" align="center">
          <q-circular-progress color="primary" size="md" indeterminate />
        </div>

        <q-list v-else-if="unidades.length > 0" separator>
          <q-item v-bind:key="index" v-for="(unidade, index) in unidades">
            <q-item-section>{{ unidade }}</q-item-section>
          </q-item>
        </q-list>

        <div v-else>Nenhuma unidade cadastrada</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Adicionar" color="primary" to="/unidade" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      unidades: [],
      isFetching: true,
    };
  },
  methods: {
    handleSession() {
      const token = localStorage.getItem('apo@session');
      if (!token) this.$router.push('login');
    },
  },
  mounted() {
    this.handleSession();
  },
});
</script>
