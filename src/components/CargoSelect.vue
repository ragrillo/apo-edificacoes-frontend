<template>
  <q-select v-model="cargoSelecionado" outlined :options="listaCargos" behavior="menu" label="Cargo" emit-value
    @update:model-value="enviarCargo(cargoSelecionado)" clearable>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="fit justify-between">
        <q-item-section>
          <q-item-label>{{ scope.opt.value }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat rounded style="max-width:50px" icon="info" push>
            <q-popup-proxy style="width: 50%" context-menu>
              <q-banner>
                <span>
                  {{ scope.opt.label }}
                </span>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref } from 'vue';
import cargos from '../assets/data/cargos.json';

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
