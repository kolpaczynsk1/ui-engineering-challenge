<template lang="pug">
  .charactr-select-input-wrapper
    .label Hello, I'm not finished UI element, and I need some love.
</template>
<script>
import { onMounted } from '@nuxtjs/composition-api';

export default {
  props: {
    value: {
      type: Array,
    },
  },
  setup(props) {

    onMounted(() => {});

    return {};
  }
};

</script>
<style lang="scss" scoped>
.charactr-select-input-wrapper {
  .label {

  }
}
</style>