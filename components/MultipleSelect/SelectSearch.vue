<template lang="pug">
    .input-wrapper
        input(
            type="text"
            :placeholder="placeholder"
            v-model="inputValue"
            ref="input"
            @input="searchValue()"
            @keydown="onKeydown($event)"
            @focus="toggleList(true)"
        )
        p(
            v-if="suggestion && Object.keys(suggestion).length"
            class="suggestion"
        ) {{ autocomplete }}
</template>

<script>
import { computed, defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "select-search",
    props: {
        placeholder: {
            type: String,
            requied: true,
        },
        suggestion: {
            type: Object,
            default: () => {}
        }
    },
    emits: [
        'getValue',
        'toggleList',
        'deleteItem',
        'updateSelected'
    ],
    setup(props, { emit }) {
        const inputValue = ref('');

        const searchValue = () => {
            emit('getValue', inputValue.value);
        }

        const toggleList = (status) => {
            emit('toggleList', status);
        }

        const input = ref();

        const focus = () => {
            input.value.focus();
        }

        const autocomplete = computed(() => {
            return (
                props.suggestion.tag[0].toUpperCase() + props.suggestion.tag.slice(1).toLowerCase()
            );
        });

        const onKeydown = (e) => {
            if(e.key === "Backspace" && !inputValue.value.length)
                emit('deleteItem');
            else if(e.key === "Enter" && props.suggestion && inputValue.value.length) {
                emit('updateSelected', props.suggestion.id);
                inputValue.value = '';
                searchValue();
            }
        };

        return {
            inputValue,
            onKeydown,
            toggleList,
            searchValue,
            autocomplete,
            focus,
            input
        }
    }
});
</script>

<style lang="scss" scoped>
    .input-wrapper {
        position: relative;
        display: inline-block;
        width: fit-content;

        input {
            border: 0;
            outline: 0;
            padding: 5px 10px;
            width: 100%;
            background: transparent;
            color: var(--select-text-primary);
            user-select: none;
            text-transform: capitalize;
        }

        .suggestion {
            position: absolute;
            top: 3px;
            left: 1px;
            margin-left: 10px;
            font-size: 14px;
            background: var(--select-background-secondary);
            opacity: 0.3;
            pointer-events: none;
            color: var(--select-text-primary);
        }
    }
</style>