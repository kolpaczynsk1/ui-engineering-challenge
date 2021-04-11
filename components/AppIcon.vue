<template lang="pug">
  img(
      :src="require(`~/assets/icons/${ name }.svg`)"
      alt="name"
      :style="{ 'width': size + 'px' }"
  )
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
    name: "app-icon",
    props: {
        name: {
            type: String,
            require: true,
        },
        size: {
            type: Number,
            default: 14,
        },
    }
});
</script>

<style lang="scss" scoped>
    img {
        transform: rotate(180deg);
        transition: 0.3s ease-in;

        &.rotate-180 {
            transform: rotate(0);
            transition: 0.3s ease-in;
        }

        &.rotate-45 {
            transform: rotate(45deg);
            transition: 0.3s ease-in;
        }
    }
</style>