<template lang="pug">
    .list-wrapper
        .list(
            v-if="items.length"
        )
            SelectListItem(
                v-for="(item, key) in items"
                :key="key"
                :id="item.id"
                :active="item.active"
                :value="item.tag"
                :isOdd="key % 2 == 0"
                @updateSelected="$emit('updateSelected', $event)"
                v-show="search(item)"
            )
</template>

<script>
import { defineComponent, watchEffect } from '@nuxtjs/composition-api';
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
        const search = (item) => {
            return (
                !props.searchTerm || 
                item.tag.toLowerCase().startsWith(props.searchTerm.toLowerCase())
            );
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
            search,
        }
    }
})
</script>

<style lang="scss" scoped>
    .list-wrapper {
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        user-select: none;
        border-radius: 0 0 5px 5px;
    }
</style>