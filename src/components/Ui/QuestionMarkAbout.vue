<template>
  <fa icon="question-circle"
      class="question-mark-about"
      v-tippy="{
        content : text,
        touch   : true,
      }"
  />
</template>

<script lang="ts">
import Fontawesome from "@/components/Libs/Fontawesome.vue";

export default {
  name: "QuestionMarkAbout",
  components: {
    "fa": Fontawesome
  },
  props: {
    text: {
      type     : String,
      required : true,
    }
  }
}
</script>

<style lang="scss" scoped>
.question-mark-about {
  @apply text-blue-500 lg:text-base text-2xl
}
</style>