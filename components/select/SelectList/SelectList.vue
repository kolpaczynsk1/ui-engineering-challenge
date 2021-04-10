<template lang="pug">
    .list
        SelectListItem(
            v-for="(item, key) in items"
            :key="key"
            :isOdd="key % 2 == 0"
            @click.native="selectItem(item)"
        ) {{ item.tag }}
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import SelectListItem from './SelectListItem';

export default defineComponent({
    name: "select-list",
    components: {
        SelectListItem
    },
    props: {
        items: {
            type: Array
        }
    },
    emits: [
        'updateSelected'
    ],
    setup(props, { emit }) {
        const selectItem = (tag) => {
           emit('updateSelected', tag);
        }

        return { selectItem }
    }
})
</script>

<style lang="scss" scoped>
    .list {
        position: absolute;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        user-select: none;
    }
</style>