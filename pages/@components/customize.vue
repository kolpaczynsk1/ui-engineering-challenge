<template lang="pug">
    .customize
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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import useTheme from '../../components/MultipleSelect/Composable/useTheme';

export default defineComponent({
    name: 'customize',
    setup() {
        const { setTheme } = useTheme();
        const currentTheme = ref('light');

        onMounted(() => {
            setTheme(currentTheme.value);
        })

        return {
            currentTheme,
            setTheme
        }
    }
});
</script>

<style lang="scss" scoped>
.customize {
    padding-top: 20px;

    input {
    margin: 15px 5px;
    }

    label {
    margin-right: 10px;
    }
}
</style>