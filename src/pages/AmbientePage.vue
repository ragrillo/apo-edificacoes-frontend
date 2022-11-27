<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Cadastro de Ambiente</div>
      Preencha as informações abaixo.
    </q-card-section>

    <q-list separator>
      <q-item v-bind:key="index" v-for="(ambiente, index) in ambientes" class="q-pt-md">
        <q-item-section>
          <q-item-label lines="1">{{ ambiente }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Próximo" to="/ambiente/editar" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import ambiente from '../assets/data/ambientes.json';

const edificacao = 'habitacao';

export default defineComponent({
  name: 'AmbientePage',
  data() {
    return {
      ambientes: ambiente[edificacao],
    };
  },
});
</script>
