<template>
  <q-banner :class="`q-mt-sm text-white bg-${type === 'error' ? 'red' : 'green'}`">
    {{ message }}
  </q-banner>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
};
</script>
