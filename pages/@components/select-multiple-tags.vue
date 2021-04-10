<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        :multiple="true"
      )
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';
import Select from '~/components/select/Select';

export default defineComponent({
  name: "select-multiple-tags",
  components: {
    'app-select': Select
  },
  props: {
    value: {
      type: Array,
    },
  },
});

</script>
<style lang="scss" scoped>
.charactr-select-input-wrapper {
  .label {

  }
}
</style>