<template lang="pug">
  .item
    slot()
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "select-tag",
});
</script>

<style lang="scss" scoped>
    .item {
        display: inline-block;
        width: fit-content;
        padding: 2px 4px;
        background: #ccc;
        border-radius: 5px;
        margin: 0 5px;
    }
</style>