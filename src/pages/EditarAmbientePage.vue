<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">Editar Ambientes</div>
      Selecione um ambiente abaixo
    </q-card-section>

    <q-list separator>
      <q-item v-bind:key="index" v-for="(ambiente, index) in ambientes" class="q-pt-md">
        <q-item-section>
          <q-item-label lines="1">{{ ambiente }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat dense rounded color="primary" icon="edit" @click="enableEditingMode()" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions align="right">
      <q-btn flat color="primary" label="Anterior" to="/ambiente" />
      <q-btn flat color="primary" label="Próximo" to="/ambiente/editar" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="editingMode">
    <q-card style="width: 100%">
      <q-card-section>
        <q-form class="q-gutter-y-sm">
          <div class="q-my-md text-bold">Tipo do Ambiente</div>

          <q-select v-model="ambiente.tipoAmbiente" outlined label="Selecionar" behavior="menu"
            :options="tipoAmbiente" />

          <div class="q-my-md text-bold">Dimensões</div>

          <q-input v-model="ambiente.dimensoes.largura" outlined label="Largura (m)" type="number" />
          <q-input v-model="ambiente.dimensoes.comprimento" outlined label="Comprimento (m)" type="number" />
          <q-input v-model="ambiente.dimensoes.peDireito" outlined label="Pé Direito (m)" type="number" />

          <div class="q-my-md text-bold">Janelas</div>

          <div class="q-gutter-y-sm" v-for="(janela, index) in ambiente.janelas" v-bind:key="index">
            <div class="q-my-md">Janela {{ index + 1 }}</div>

            <q-input v-model="janela.largura" outlined label="Largura (m)" type="number" />
            <q-input v-model="janela.altura" outlined label="Altura (m)" type="number" />

            <q-checkbox v-model="janela.instaladaNaFachada" label="Instalada na fachada" />

            <div class="q-gutter-y-sm" v-show="janela.instaladaNaFachada">
              <q-input v-model="janela.areaVentilacao" outlined label="Área de Ventilação" type="number" />
              <q-input v-model="janela.areaIluminacao" outlined label="Área de Iluminação" type="number" />
            </div>
          </div>

          <div class="q-gutter-sm">
            <q-btn dense outline color="primary" icon="add" @click="adicionarArea('Janela')" />
            <q-btn dense outline color="primary" icon="remove" @click="removerArea('Janela')" />
          </div>

          <div class="q-my-md text-bold">Portas</div>

          <div class="q-gutter-y-sm" v-for="(porta, index) in ambiente.portas" v-bind:key="index">
            <div class="q-my-md">Porta {{ index + 1 }}</div>

            <q-input v-model="porta.largura" outlined label="Largura (m)" type="number" />
            <q-input v-model="porta.altura" outlined label="Altura (m)" type="number" />

            <q-checkbox v-model="porta.instaladaNaFachada" label="Instalada na fachada" />

            <div class="q-gutter-y-sm" v-show="porta.instaladaNaFachada">
              <q-input v-model="porta.areaVentilacao" outlined label="Área de Ventilação" type="number" />
              <q-input v-model="porta.areaIluminacao" outlined label="Área de Iluminação" type="number" />
            </div>
          </div>

          <div class="q-gutter-sm">
            <q-btn dense outline color="primary" icon="add" @click="adicionarArea('Porta')" />
            <q-btn dense outline color="primary" icon="remove" @click="removerArea('Porta')" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat color="primary" label="Cancelar" @click="editingMode = false" />
        <q-btn flat color="primary" label="Salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import ambientes from '../assets/data/ambientes.json';

const tipoAmbiente = ['Coberto', 'Descoberto'];

const tipoArea = {
  largura: '',
  altura: '',
  instaladaNaFachada: false,
  areaVentilacao: '',
  areaIluminacao: '',
};

export default defineComponent({
  name: 'EditarAmbientePage',
  data() {
    return {
      ambientes: ['BWC Social', 'BWC Suíte', 'Sala de Estar'],
      tipoAmbiente,
      editingMode: false,
      ambiente: {
        nomeAmbiente: '',
        tipoAmbiente: '',
        dimensoes: {
          largura: '',
          comprimento: '',
          peDireito: '',
        },
        areaAmbiente: 0,
        janelas: [],
        portas: [],
        areaAbertura: {
          portas: '',
          ventilacao: '',
          iluminacao: '',
        },
        areaEsquadrias: '',
      },
    };
  },
  methods: {
    enableEditingMode() {
      this.editingMode = true;
    },
    adicionarArea(area) {
      if (area === 'Janela') {
        this.ambiente.janelas.push(tipoArea);
      } else {
        this.ambiente.portas.push(tipoArea);
      }
    },
    removerArea(area) {
      if (area === 'Janela') {
        this.ambiente.janelas.pop(tipoArea);
      } else {
        this.ambiente.portas.pop(tipoArea);
      }
    },
  },
});
</script>
