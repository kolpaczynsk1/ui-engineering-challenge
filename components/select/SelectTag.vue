<template lang="pug">
  .item-wrapper
    .item
        slot()
    span ,
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "select-tag",
    props: {
        isLast: {
            type: Boolean,
            default: false,
        }
    }
});
</script>

<style lang="scss" scoped>
    .item-wrapper {
        display: inline-block;

        .item {
            font-size: 10px;
            display: inline-block;
            width: fit-content;
            padding: 2px 4px;
            background: #ccc;
            border-radius: 5px;
            margin: 5px;
            cursor: pointer;
        }
    }

</style>