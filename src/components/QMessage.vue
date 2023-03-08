<template>
  <q-banner :class="`text-white bg-${type === 'error' ? 'red' : 'primary'}`">
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
