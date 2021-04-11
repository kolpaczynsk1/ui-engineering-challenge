<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        @selected="$emit('selected', $event)"
      )
      customize()
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';
import Select from '~/components/MultipleSelect/Select';
import Customize from './customize';

export default defineComponent({
  name: "select-multiple-tags",
  components: {
    'app-select': Select,
    Customize
  },
  props: {
    value: {
      type: Array,
    },
  },
});

</script>
<style lang="scss" scoped>
  .customize-select {
    width: 100%;
  }
</style>
