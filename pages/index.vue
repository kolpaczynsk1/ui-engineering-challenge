<template lang="pug">
  section.root
    selection(v-model="source")
</template>

<script>
import CharactrInput from "@components/select-multiple-tags.vue";

export default {
  components: {
    selection: CharactrInput
  },
  data() {
    let source = [];

    return {
      source
    };
  },
  async fetch() {
    this.source = await fetch('input-data.json')
      .then(res => res.json())
      .catch(err => console.error(err));
  }
};
</script>

<style lang="scss">
@import '@styles/colors.scss';
@import '@styles/themes.scss';

body, html {
  background: $brand-color-hero;
}
.root {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
