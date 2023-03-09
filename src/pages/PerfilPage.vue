<template>
  <q-layout>
    <q-card class="q-ma-lg">
      <q-card-section>
        <div class="text-h6">Unidades Cadastradas</div>
      </q-card-section>

      <q-card-section>
        <div v-if="possuiUnidades">
          <q-list v-for="unidade in unidades" :key="unidade.nome">
            <q-item class="q-py-sm">
              <q-item-section>
                <q-item-label>{{ unidade.nome }}</q-item-label>
                <q-item-label caption>{{ unidade.telefone }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn flat rounded dense color="primary" icon="more_vert">
                  <q-menu>
                    <q-list>
                      <q-item clickable v-ripple @click="irPara('/unidade')">
                        <q-item-section>Editar</q-item-section>
                      </q-item>
                      <q-item clickable v-ripple @click="irPara('/criterio')">
                        <q-item-section>Avaliar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-item-section>
            </q-item>
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
import VueJwtDecode from 'vue-jwt-decode';
import { api } from '../boot/axios';

export default {
  data() {
    return {
      unidades: [],
    };
  },
  mounted() {
    const token = localStorage.getItem('apo@session');
    this.token = VueJwtDecode.decode(token);

    const { id, edificacao } = this.token;
    const endpoint = `/unidades/${edificacao}/proprietario/${id}`;

    api.get(endpoint).then(({ data }) => {
      this.unidades = data;
    });
  },
  methods: {
    irPara(rota) {
      this.$router.push(rota);
    },
  },
  computed: {
    possuiUnidades() {
      return this.unidades.length > 0;
    },
  },
};
</script>
