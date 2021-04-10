<template lang="pug">
  .item(
    :style="{ background: isOdd ? theme['primary'] : theme['secondary'] }"
  )
    slot()
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"


export default defineComponent({
    name: "select-item-list",
    props: {
        isOdd: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        // todo: theme
        const theme = {
            primary: '#fff',
            secondary: '#ccc'
        }

        return {
            theme,
        }
    }
});

</script>

<style lang="scss" scoped>
    .item {
        text-align: left;
        padding: 5px 10px;
    }
</style>