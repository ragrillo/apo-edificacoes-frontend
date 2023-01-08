<template>
  <div>
    <div style="width: 90%">
      {{ label }}
      <q-btn v-if="hint" flat dense rounded icon="info" color="grey" @click="showHint" />
    </div>

    <div v-if="type === 'yes-no'">
      <div v-bind:key="index" v-for="(option, index) in options.fromYesToNo">
        <q-radio v-model="value" :val="option" :label="option" />
      </div>
    </div>

    <div v-if="type === 'good-bad'">
      <div v-bind:key="index" v-for="(option, index) in options.fromGoodToBad">
        <q-radio v-model="value" :val="option" :label="option" />
      </div>
    </div>

    <q-dialog v-model="isVisible">
      <q-card>
        <q-card-section>
          <div class="text-bold">{{ label }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          {{ hint }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" @click="isVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const options = {
  fromYesToNo: ['Sim', 'Não', 'Não sei responder', 'Não se aplica'],
  fromGoodToBad: ['Excelente', 'Bom', 'Regular', 'Ruim', 'Péssimo'],
};

export default defineComponent({
  name: 'QuestionarioComponent',
  props: ['label', 'type', 'hint'],
  data() {
    return {
      options,
      value: '',
      isVisible: false,
    };
  },
  methods: {
    showHint() {
      this.isVisible = true;
    },
  },
});
</script>
