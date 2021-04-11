<template lang="pug">
    div
        .outside(
            v-show="isExpanded"
            @click="isExpanded = false"
        )
        .select-wrapper(
            :style="styles"
        )
            .select(
                :style="{ 'border-radius': isExpanded ? `${ radius } ${ radius } 0 0 `: radius }"
            )
                .select__text(
                    @click="search.focus()"
                )
                    select-tag(
                        v-for="(item, index) in activeTags"
                        :key="index"
                        @click.native="addTag(item); update()"
                    ) {{ item.tag }}
                    select-search(
                        :placeholder="placeholder"
                        :suggestion="suggestion"
                        @getValue="getInputValue($event)"
                        @toggleList="isExpanded = $event"
                        @deleteItem="deleteTag()"
                        @updateSelected="enterTag($event); update()"
                        ref="search"
                    )
                .select__icon
                    app-icon(
                        name="arrow"
                        :class="{ 'rotate-180': isExpanded }"
                        @click.native="isExpanded = !isExpanded"
                    )
            .list
                transition(
                    name="fade-in"
                )
                    select-list(
                        v-show="isExpanded"
                        :items="options"
                        :searchTerm="searchTerm"
                        @updateSelected="addTag($event); update()"
                        @suggestion="getSuggestion($event)"
                    )
</template>

<script>
import SelectTag from './SelectTag';
import SelectSearch from './SelectSearch';
import SelectList from './SelectList/SelectList';
import AppIcon from '~/components/AppIcon';
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api';
import useTags from './SelectComposable/useTags';
import useSearch from './SelectComposable/useSearch';

export default defineComponent({
    components: {
        SelectTag,
        SelectSearch,
        SelectList,
        AppIcon
    },
    emits: [
        'active'
    ],
    props: {
        options: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: '60px'
        },
        width: {
            type: String,
            default: '400px'
        },
        radius: {
            type: String,
            default: '5px'
        },
        placeholder: {
            type: String,
            default: 'Szukaj...'
        }
    },
    setup(props, { emit }) {
        const { 
            activeTags, 
            addTag, 
            deleteTag,
            enterTag,
        } = useTags();

        const update = () => {
            emit('active', activeTags);
        }

        const { 
            searchTerm,
            getInputValue,
            suggestion,
            getSuggestion
        } = useSearch();

        const styles = reactive({
            'min-height': props.height,
            'max-width': props.width,
        });

        const isExpanded = ref(false);
        const search = ref(search);

        return {
            styles,
            isExpanded,
            getInputValue,
            searchTerm,
            activeTags,
            addTag,
            deleteTag,
            enterTag,
            suggestion,
            getSuggestion,
            search,
            update
        }
    },
});
</script>

<style lang="scss" scoped>
    .select-wrapper {
        position: relative;
        margin: 0 auto;

        .select {
            position: relative;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            min-height: inherit;
            cursor: pointer;
            background: var(--select-background-primary);

            &__text {
                padding: 10px;
                width: 100%;
                text-align: left;
            }

            .tags {
                width: fit-content;
            }

            &__icon {
                position: absolute;
                cursor: pointer;
                right: 20px;
                text-align: center;
            }
        }
    }

    .outside {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .fade-in-enter-active {
        transition: all 0.2s ease;
    }

    .fade-in-leave-active {
        transition: all 0.2s ease;
    }

    .fade-in-enter,
    .fade-in-leave-to {
        opacity: 0;
    }
</style>