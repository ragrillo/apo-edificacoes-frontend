<template>
  <div class="fullscreen text-center flex flex-center">
    <div>
      <div class="text-h2" style="font-size: 7vh; opacity:.4">
        Página não encontrada!
      </div>

      <q-btn
        flat
        to="/"
        class="q-mt-xl"
        color="blue"
        label="Ir para Página inicial"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
