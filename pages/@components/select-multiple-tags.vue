<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        @selected="getSelected($event)"
      )
</template>
<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import Select from '~/components/select/Select';
import light from '~/components/select/SelectThemes/light';
import useTheme from '../../components/select/SelectComposable/useTheme';

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
  setup() {
    const { createTheme } = useTheme();

    const theme = createTheme(light);
    let activeOptions = reactive({});

    const getSelected = (items) => {
      activeOptions = items;
    }

    return {
      theme,
      getSelected,
    }
  }
});

</script>
<style lang="scss" scoped>
  .customize-select {
    width: 100%;
  }
</style>