<template lang="pug">
    .select-wrapper
        .select(
            :style="[styles, theme]"
        )
            .select__text(@click="search.focus()")
                select-tag(
                    v-for="(item, index) in activeTags"
                    :key="index"
                    @click.native="updateSelected(item)"
                ) {{ item.tag }}
                select-search(
                    :placeholder="placeholder"
                    :suggestion="suggestion"
                    @getValue="getInputValue($event)"
                    @toggleList="isExpanded = $event"
                    @deleteItem="deleteItem()"
                    @updateSelected="updateSelected($event)"
                    ref="search"
                )
            .select__icon
                app-icon(
                    @click.native="isExpanded = !isExpanded"
                )
        .list
            select-list(
                v-show="isExpanded"
                :items="options"
                :searchTerm="searchTerm"
                @updateSelected="updateSelected($event)"
                @suggestion="getSuggestion($event)"
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
            default: '400px'
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
        },
        placeholder: {
            type: String,
            default: 'Szukaj...'
        }
    },
    setup(props) {
        const styles = reactive({
            'min-height': props.height,
            'border-radius': props.radius,
            width: props.width,
            background: 'white'
        });

        const searchTerm = ref('');

        const getInputValue = (value) => {
            searchTerm.value = value;
        };

        const isExpanded = ref(false);

        const activeTags = reactive([]);

        const updateSelected = (tag) => {
            for(let [index, activeTag] of activeTags.entries())
                if(activeTag.id === tag.id) {
                    activeTags.splice(index, 1);
                    return;
                }

            activeTags.push(tag);
        }

        const deleteItem = () => {
            activeTags.pop();
        }

        let suggestion = ref({});

        const getSuggestion = (item) => {
            suggestion.value = item;
        }

        const search = ref(search);

        return {
            styles,
            isExpanded,
            getInputValue,
            searchTerm,
            activeTags,
            updateSelected,
            deleteItem,
            suggestion,
            getSuggestion,
            search
        }
    },
});
</script>

<style lang="scss" scoped>
    .select-wrapper {
        position: relative;

        .select {
            position: relative;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            cursor: pointer;

            &__text {
                padding: 10px;
                width: 95%;
                text-align: left;
            }

            .tags {
                width: fit-content;
            }

            &__icon {
                position: absolute;
                cursor: pointer;
                right: 10px;
            }
        }
    }
</style>