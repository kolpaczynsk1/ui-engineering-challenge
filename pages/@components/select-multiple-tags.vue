<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        :multiple="true"
        @active="getActive($event)"
      )
</template>
<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import Select from '~/components/select/Select';
import dark from '~/components/select/SelectThemes/dark';
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

    const theme = createTheme(dark);
    let activeOptions = reactive({});

    const getActive = (items) => {
      activeOptions = items;
    }

    return {
      theme,
      getActive
    }
  }
});

</script>
<style lang="scss" scoped>
  .customize-select {
    width: 100%;
  }
</style>