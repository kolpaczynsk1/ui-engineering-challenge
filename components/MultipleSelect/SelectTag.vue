<template lang="pug">
  .item-wrapper
    .item
        slot()
    span(class="comma") ,
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
        color: var(--select-text-secondary);
        user-select: none;

        .item {
            font-size: 12px;
            display: inline-block;
            width: fit-content;
            padding: 5px 10px;
            background: var(--select-primary);
            border-radius: 5px;
            margin: 5px;
            cursor: pointer;
            transition: 0.3s ease-out;

            &:hover {
                background: var(--select-secondary);
                transition: 0.3s ease-out;
            }
        }
        
        .comma {
            color: var(--select-text-primary);
        }
    }
</style>