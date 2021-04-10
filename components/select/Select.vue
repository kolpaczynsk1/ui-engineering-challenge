<template lang="pug">
    .select-wrapper
        .select(
            :style="[styles, theme]"
            @click="isExpanded = !isExpanded"
        )   
            .tags
                select-tag(
                    v-for="(item, key) in activeTags"
                    :key="key"
                ) {{ item.tag }}
            select-search()
            app-icon()
        .list
            select-list(
                :items="options"
                v-show="isExpanded"
                @updateSelected="updateSelected($event)"
            )
</template>

<script>
import SelectTag from './SelectTag';
import SelectSearch from './SelectSearch';
import SelectList from './SelectList/SelectList';
import AppIcon from '~/components/AppIcon';
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api';

export default defineComponent({
    components: {
        SelectTag,
        SelectSearch,
        SelectList,
        AppIcon
    },
    props: {
        options: {
            type: Array,
        },
        height: {
            type: String,
            default: '35px'
        },
        width: {
            type: String,
            default: '220px'
        },
        radius: {
            type: String,
            default: '5px'
        },
        theme: {
            type: [String, Object],
            default: 'light'
        },
        multiple: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            activeTags: {}
        }
    },
    methods: {
        updateSelected(tag) {
            if(!this.activeTags[tag.id])
                this.$set(this.activeTags, tag.id, tag);
            else 
                this.$delete(this.activeTags, tag.id);
        }
    },
    setup(props) {
        const styles = reactive({
            height: props.height,
            width: props.width,
            'border-radius': props.radius,
            background: 'white'
        });

        const isExpanded = ref(false);

        return {
            styles,
            isExpanded,
        }
    },
});
</script>

<style lang="scss" scoped>
    .select-wrapper {
        position: relative;

        .select {
            display: flex;
            align-items: center;

            .tags {
                width: fit-content;
            }
        }
    }
</style>