<template>
  <q-dialog :modelValue="true" persistent>
    <q-card style="width: 100%">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ ambiente.nome }}</div>
      </q-card-section>

      <q-tabs class="text-primary" v-model="dimension" @update:model-value="handleDimensionChange">
        <q-tab name="Ambiente" label="Ambiente" />
        <q-tab name="Gestão e Projeto" label="Gestão e Projeto" />
      </q-tabs>

      <q-tab-panels v-model="dimension">
        <q-tab-panel name="Ambiente">
          <q-list v-bind:key="index" v-for="(item, index) in criterios">
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.titulo }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn dense flat color="primary" label="Responder" @click="
                  irParaCriterio(item.numero)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="Gestão e Projeto">
          <q-list v-bind:key="index" v-for="(item, index) in criterios">
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.titulo }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn dense flat color="primary" label=" Responder" @click="irParaCriterio(item.numero)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions align="right">
        <q-btn flat color="primary" label="Voltar" @click="fecharpopup()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
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
    };
  },
  mounted() {
    localStorage.setItem('apo@ambiente_id', this.ambiente._id);
    this.handleDimensionChange();
  },
  methods: {
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
