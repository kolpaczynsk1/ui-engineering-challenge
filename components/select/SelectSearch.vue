<template lang="pug">
    .input-wrapper
        input(
            type="search"
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
            :style="{ left: inputValue.length + 'ch' }"
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

        const onKeydown = (e) => {
            if(e.key === "Backspace" && !inputValue.value.length)
                emit('deleteItem');
            else if(e.key === "Enter" && Object.keys(props.suggestion).length)
                emit('updateSelected', props.suggestion);
        };

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
            return (Object.keys(props.suggestion).length
                ? props.suggestion.tag.toLowerCase().slice(inputValue.value.length)
                : ''
            );
        });

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
        }

        .suggestion {
            position: absolute;
            top: 3px;
            left: 0;
            margin-left: 10px;
            font-size: 14px;
            background: #ccc;
            opacity: 0.3;
            pointer-events: none;
        }
    }
</style>