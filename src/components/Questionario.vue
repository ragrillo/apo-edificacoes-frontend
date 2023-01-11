<template>
  <div>
    <div class="q-mb-md" style="width: 90%">
      {{ label }}
      <q-btn v-if="hint" flat dense rounded icon="info" color="grey" @click="showHint" />
    </div>

    <div>
      <div :key="index" v-for="(option, index) in type.split(',')">
        <q-radio v-model="value" :val="option" :label="option" />
      </div>
    </div>

    <q-dialog v-model="isVisible">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-bold">{{ label }}</div>
        </q-card-section>

        <q-card-section style="white-space: pre-line;">
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

export default defineComponent({
  name: 'QuestionarioComponent',
  props: ['label', 'type', 'hint'],
  data() {
    return {
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
