<template>
  <q-page class="q-pa-md">
    <q-header>
      <q-toolbar>
        <q-btn dense rounded flat icon="arrow_back" to="/home" />
        <q-toolbar-title>
          Critérios
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-select v-model="ambiente" outlined class="q-mb-md" label="Selecione o ambiente" behavior="menu" :options="ambientes" />

    <q-card class="q-mb-md" v-bind:key="index" v-for="(criterio, index) in criterios">
      <q-card-section>
        <div class="text-bold">{{ criterio.nome }}</div>
      </q-card-section>
      <q-list separator>
        <q-item v-bind:key="index" v-for="(subcriterio, index) in criterio.subcriterios">
          <q-item-section>
            <q-item-label lines="1">{{ subcriterio.nome }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn outline :href="subcriterio.link" style="width: 128px" :color="subcriterio.respondido ? 'grey' : 'primary'" :label="subcriterio.respondido ? 'Respondido' : 'Responder'" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from '../boot/axios';

const example = ['Ambiente 1', 'Ambiente 2'];

export default defineComponent({
  name: 'CriteriosPage',
  data() {
    return {
      criterios: [],
      ambiente: '',
      ambientes: example,
    };
  },
  async mounted() {
    const { data } = await api.get('/criterio');
    this.criterios = data.body;
  },
});
</script>
