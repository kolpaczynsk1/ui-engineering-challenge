<template lang="pug">
    div
        .outside(
            v-show="isExpanded"
            @click="isExpanded = false"
        )
        .select-wrapper(
            v-if="tags.length"
            :style="styles"
        )
            .select(
                :style="{ 'border-radius': isExpanded ? `${ radius } ${ radius } 0 0 `: radius }"
            )
                .select__text(
                    @click="focusSearch()"
                )
                    select-tag(
                        v-for="(item, index) in activeTags"
                        :key="index"
                        @click.native="toggleItem(item.id);"
                    ) {{ item.tag }}
                    select-search(
                        :placeholder="placeholder"
                        :suggestion="suggestion"
                        @getValue="getInputValue($event)"
                        @toggleList="isExpanded = $event"
                        @deleteItem="popItem()"
                        @updateSelected="toggleItem($event);"
                        ref="search"
                    )
                .select__icon
                    app-icon(
                        name="arrow"
                        :class="{ 'rotate-180': isExpanded }"
                        @toggle="isExpanded = !isExpanded"
                    )
                        arrow()
            .list
                transition(
                    name="fade-in"
                )
                    select-list(
                        v-show="isExpanded"
                        :items="tags"
                        :searchTerm="searchTerm"
                        @updateSelected="toggleItem($event);"
                        @suggestion="getSuggestion($event)"
                    )
</template>

<script>
import SelectTag from './SelectTag';
import SelectSearch from './SelectSearch';
import SelectList from './SelectList/SelectList';
import AppIcon from '~/components/AppIcon';
import Arrow from './Icons/Arrow';

export default {
    components: {
        SelectTag,
        SelectSearch,
        SelectList,
        AppIcon,
        Arrow
    },
    emits: [
        'active',
        'selected'
    ],
    data() {
        return {
            isExpanded: false,
            styles: {
                'min-height': this.height,
                'max-width': this.width,
            },
            tags: [],
            searchTerm: '',
            suggestion: {}
        }
    },
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
    methods: {
        toggleItem(id) {
            for(let item of this.tags) {
                if(item.id === id) {
                    !item['active']
                        ? this.$set(item, 'active', !item['active'])
                        : this.$delete(item, 'active');
                    return;
                }
            }
        },
        popItem() {
            if(this.activeTags.length) {
                this.toggleItem(
                    this.activeTags[this.activeTags.length - 1].id
                );
            }
        },
        focusSearch() {
            this.$refs.search.focus();
        },
        getInputValue(value) {
            this.searchTerm = value;
        },
        getSuggestion(value) {
            this.suggestion = value;
        }
    },
    computed: {
        activeTags() {
            const value =  this.tags.filter((item) => item['active']);

            this.$emit('selected', value);
            return value;
        },
    },
    watch: {
        options(val) {
            this.tags = JSON.parse(JSON.stringify(val));
        }
    },
    mounted() {
        this.tags = JSON.parse(JSON.stringify(this.options));
    },
};
</script>

<style lang="scss" scoped>
    .select-wrapper {
        position: relative;
        width: 90%;
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
                padding: 10px 40px 10px 10px;
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