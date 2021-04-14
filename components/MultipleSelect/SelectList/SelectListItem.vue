<template lang="pug">
  .item(
    :class="{ 'item--odd': isOdd, 'active': active }"
    @click="toggleItem()"
  )
    p {{ value }}
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
        value: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const toggleItem = () => {
            emit('updateSelected', props.id);
        };

        return {
            toggleItem
        }
    }
});

</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        justify-content: space-between;
        text-align: left;
        padding: 15px;
        cursor: pointer;
        font-size: 14px;
        background: var(--select-background-primary);
        color: var(--select-text-primary);
        transition: 0.2s ease-out;

        &:hover {
            background: var(--select-background-secondary);
            transition: 0.3s ease-out;
        }

        &--odd {
            background: var(--select-background-secondary);
            transition: 0.3s ease-out;
        }

        &.active {
            background: var(--select-primary);
            color: var(--select-text-secondary);
            transition: 0.2s ease-out;

            &:hover {
                background: var(--select-secondary);
                transition: 0.2s ease-out;
            }
        }
    }
</style>