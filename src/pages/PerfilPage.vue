<template>
  <q-layout>
    <q-card class="q-ma-lg">
      <q-card-section>
        <div class="text-h6">Unidades Cadastradas</div>
      </q-card-section>

      <q-card-section>
        <div v-if="possuiUnidades">
          <q-list v-for="unidade in unidades" :key="unidade.nome">
            <q-item>
              <q-item-section class="q-gutter-y-md">
                <div>
                  <q-item-label>{{ unidade.nome }}</q-item-label>
                  <q-item-label caption>{{ unidade.telefone }}</q-item-label>
                </div>
                <div>
                  <q-btn flat dense color="primary" label="Iniciar avaliação" @click="irPara(`/unidade/${unidade._id}/ambiente`)"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator class="q-mb-sm"/>
          </q-list>
        </div>

        <span v-else>Não há unidades cadastradas.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Adicionar" to="/unidade" />
      </q-card-actions>
    </q-card>
  </q-layout>
</template>

<script>
import { api } from '../boot/axios';

export default {
  data() {
    return {
      unidades: [],
    };
  },
  mounted() {
    this.obterUnidades();
  },
  methods: {
    irPara(rota) {
      this.$router.push(rota);
    },
    async excluirUnidade(id) {
      const edificacao = localStorage.getItem('apo@usuario_edificacao');
      const endpoint = `/unidades/${edificacao}/${id}`;

      await api.delete(endpoint);
      this.obterUnidades();
    },
    async obterUnidades() {
      const id = localStorage.getItem('apo@usuario_id');
      const edificacao = localStorage.getItem('apo@usuario_edificacao');

      const endpoint = `/unidades/${edificacao}/proprietario/${id}`;
      const { data } = await api.get(endpoint);

      this.unidades = data;
    },
  },
  computed: {
    possuiUnidades() {
      return this.unidades.length > 0;
    },
  },
};
</script>
