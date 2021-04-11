<template lang="pug">
  .customize-select
    .charactr-select-input-wrapper
      app-select(
        :options="value"
        @selected="getSelected($event)"
      )
      .custom
        h2 Change theme
        input(
          type="radio"
          id="light"
          value="light"
          v-model="currentTheme"
          @change="setTheme(currentTheme)"
        )
        label(
          for="light"
        ) Light
        input(
          type="radio"
          id="dark"
          value="dark"
          v-model="currentTheme"
          @change="setTheme(currentTheme)"
        )
        label(
          for="dark"
        ) Dark
</template>
<script>
import { defineComponent, onMounted, reactive, ref, watch } from '@nuxtjs/composition-api';
import Select from '~/components/select/Select';
import useTheme from '../../components/select/Composable/useTheme';

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
    let activeOptions = reactive({});

    const getSelected = (items) => {
      activeOptions = items;
    }

    onMounted(() => {
      setTheme(currentTheme.value)
    })

    return {
      currentTheme,
      getSelected,
      setTheme
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
        margin: 15px 5px;
      }

      label {
        margin-right: 10px;
      }
    }
  }
</style>