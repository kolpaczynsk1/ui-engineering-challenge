<template lang="pug">
  section.root
    h1 Vue Select Demo
    selection(
      :value="source"
      @selected="getSelected($event)"
    )
</template>

<script>
import CharactrInput from "@components/select-multiple-tags.vue";

export default {
  components: {
    selection: CharactrInput
  },
  data() {
    let source = [];
    let activeOptions = [];

    return {
      source,
      activeOptions
    };
  },
  async fetch() {
    this.source = await fetch('input-data.json')
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  methods: {
    getSelected(items) {
      this.activeOptions = items;
      console.log(items)
    }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    margin: 20px 0;
  }
}
</style>
