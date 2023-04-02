<template>
  <q-layout view="lHh Lpr lFf">
    <div id="container">
      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style>
#container {
  display: grid;
  place-items: center;
}

.q-page-container {
  width: 100%;
  max-width: 770px;
}
</style>
