<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        @selected="getSelected($event)"
      )
      .custom
        input(
          type="radio"
          id="light"
          value="light"
          v-model="currentTheme"
        )
        label(
          for="light"
        ) Light
        input(
          type="radio"
          id="dark"
          value="dark"
          v-model="currentTheme"
        )
        label(
          for="dark"
        ) Dark
</template>
<script>
import { computed, defineComponent, reactive, ref, watch } from '@nuxtjs/composition-api';
import Select from '~/components/select/Select';
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
    const { setTheme } = useTheme();
    const currentTheme = ref('light');
    const theme = setTheme(currentTheme.value);
    let activeOptions = reactive({});

    const getSelected = (items) => {
      activeOptions = items;
    }

    return {
      currentTheme,
      getSelected,
    }
  }
});

</script>
<style lang="scss" scoped>
  .customize-select {
    width: 100%;

    .custom {
      padding-top: 20px;

      input {
        margin: 0 5px;
      }

      label {
        margin-right: 10px;
      }
    }
  }
</style>