<template lang="pug">
    .icon(
        @click="toggle()"
    )
        svg(
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
            :width="size + 'px'"
            class="icon-color"
            viewBox="0 0 11.414 6.414"
        )
            title {{ name }}
            slot()
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "app-icon",
    emits: ['toggle'],
    props: {
        name: {
            type: String,
            require: true,
        },
        size: {
            type: Number,
            default: 14,
        },
    },
    setup(props, { emit }) {
        const toggle = () => {
            emit('toggle')
        }

        return {
            toggle
        }
    }
});
</script>

<style lang="scss">
    .icon {
        svg {
            transform: rotate(-180deg);
            transition: 0.3s ease-in;
        }
        
        &.rotate-180 {
            svg {
                transform: rotate(0);
                transition: 0.3s ease-in;
            }
        }

        &.rotate-45 {
            svg {
                transform: rotate(45deg);
                transition: 0.3s ease-in;
            }
        }
    }

    .icon-color {
        path {
            stroke: var(--select-text-primary);
        }
    }
</style>