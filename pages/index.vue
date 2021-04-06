<template lang="pug">
  section.root
    selection(v-model="source")
</template>

<script>

import CharactrInput from '@components/select-multiple-tags.vue';

export default {
  components: {
    'selection': CharactrInput
  },
  data() {

    let source = []; // Fetch some slots data

    return {
      source
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
