<template>
  <q-layout view="lHh Lpr lFf">
    <div id="container">
      <q-page-container id="content">
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
  height: 100%;
  display: grid;
  place-items: center;
}

#content {
  width: 100%;
  max-width: 720px;
}
</style>
