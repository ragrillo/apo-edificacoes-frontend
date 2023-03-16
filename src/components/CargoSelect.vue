<template>
  <q-select filled v-model="cargoSelecionado" :options="listaCargos" behavior="menu" label="Cargo" emit-value map-options
    @update:model-value="enviarCargo(cargoSelecionado)">
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="fit justify-between">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn dense flat rounded color="primary" icon="info" push>
            <q-popup-proxy style="width: 50%" context-menu>
              <q-card>
                <q-card-section>
                  <div class="text-bold q-mb-md">{{ scope.opt.label }}</div>
                  <div readonly>{{ scope.opt.description }}</div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Fechar" color="primary" />
                </q-card-actions>
              </q-card>
            </q-popup-proxy>
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref } from 'vue';
import cargos from '../assets/data/descricao-de-cargos.json';

const cargoSelecionado = ref();

export default defineComponent({
  name: 'CargoSelect',
  emits: ['cargoSelecionado'],
  data() {
    return {
      listaCargos: cargos,
    };
  },
  setup() {
    return {
      cargoSelecionado,
    };
  },
  methods: {
    enviarCargo(cargoEscolhido) {
      if (cargoEscolhido != null) {
        this.$emit('cargoSelecionado', cargoEscolhido);
      }
    },
  },
});

</script>
