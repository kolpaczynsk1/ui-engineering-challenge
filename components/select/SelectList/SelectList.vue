<template lang="pug">
    .list-wrapper
        .list(
            v-if="items.length"
        )
            SelectListItem(
                v-for="(item, key) in items"
                :key="key"
                :isOdd="key % 2 == 0"
                v-show="search(item)"
                @click.native="selectItem(item)"
            ) {{ item.tag }}
</template>

<script>
import { defineComponent, ref, watchEffect } from '@nuxtjs/composition-api';
import SelectListItem from './SelectListItem';

export default defineComponent({
    name: "select-list",
    components: {
        SelectListItem
    },
    props: {
        items: {
            type: Array
        },
        searchTerm: {
            type: String,
            default: '',
        },
    },
    emits: [
        'updateSelected'
    ],
    setup(props, { emit }) {
        const selectItem = (tag) => {
           emit('updateSelected', tag);
        }

        const showResults = ref(true);

        const search = (item) => {
            const isValid = (
                !props.searchTerm || 
                item.tag.toLowerCase().startsWith(props.searchTerm.toLowerCase())
            );

            if(!showResults.value && isValid) 
                showResults.value = true;

            return isValid;
        }

        const suggestion = watchEffect(() => {
            if(props.items.length)
                emit('suggestion', (
                    props.searchTerm
                        ? props.items.find(item => item.tag.toLowerCase().startsWith(props.searchTerm.toLowerCase()))
                        : null
                ));
        });

        return { 
            selectItem,
            search,
            showResults
        }
    }
})
</script>

<style lang="scss" scoped>
    .list-wrapper {
        position: absolute;
        width: 100%;
        max-height: 220px;
        overflow-y: auto;
        user-select: none;
    }
</style>