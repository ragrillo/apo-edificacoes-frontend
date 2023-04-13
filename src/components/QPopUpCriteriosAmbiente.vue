<template>
  <q-dialog :modelValue="true" persistent>
    <q-card style="width: 100%">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ ambiente.nome }}</div>
      </q-card-section>
      <q-separator />

      <q-tab-panels v-model="dimension">
        <q-tab-panel name="Ambiente">
          <q-list v-bind:key="index" v-for="(item, index) in criterios">
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.titulo }}</q-item-label>
              </q-item-section>

              <q-item-section side v-if="verificaRespondido(item.numero)">
                <q-btn flat color="green" label="Responder" @click="
                  irParaCriterio(item.numero)"/>
              </q-item-section>
              <q-item-section side v-else>
                <q-btn flat color="primary" label="Responder" @click="
                  irParaCriterio(item.numero)"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
      <q-separator />

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Voltar" @click="fecharpopup()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';
import data from '../data/relacao-criterio-dimensao-e-codigo.json';

export default defineComponent({
  name: 'CriteriosPage',
  props: {
    ambiente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      criterios: [],
      dimension: 'Ambiente',
      respostas: [],
      verifica: [],
    };
  },
  mounted() {
    localStorage.setItem('apo@ambiente_id', this.ambiente._id);
    this.handleDimensionChange();
    this.obterRespostas();
  },
  methods: {
    async obterRespostas() {
      const respostas1 = await api.get('/formularios');
      this.respostas = respostas1.data.filter((item) => item.ambiente === this.ambiente._id);
    },
    verificaRespondido(criterio) {
      const verifica = this.respostas.filter((item) => item.respostas[0].criterio.slice(0, 2) === criterio);
      console.log(verifica);
      if (verifica.length === 0) {
        return false;
      }
      return true;
    },
    handleDimensionChange() {
      this.criterios = data.filter((item) => item.dimensao === this.dimension);
    },
    irParaCriterio(numero) {
      const url = `/criterio/${numero}`;
      this.$router.push(url);
    },
    fecharpopup() {
      this.$emit('fecharpopup', false);
    },
  },
});
</script>
