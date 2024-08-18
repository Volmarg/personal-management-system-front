<template>
  <!-- the type is required, see: https://stackoverflow.com/questions/45185891/vue-js-navigate-to-url-with-question-mark -->
  <button class="rounded-lg font-bold text-white px-2 py-1 transition duration-300 ease-in-out hover:opacity-70"
          type="button"
          :class="{
            [backgroundColorClass]: true,
            [buttonExtraClasses]: true,
          }"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
export default {
  name: "ButtonRounded",
  props: {
    buttonExtraClasses: {
      type     : String,
      required : false,
      default  : ''
    },
    text: {
      type     : String,
      required : true
    },
    backgroundColorClass: {
      type     : String,
      required : false,
      default  : 'bg-blue-500'
    },
    marginRightClass: {
      type     : String,
      required : false,
      default  : 'mr-6'
    }
  }
}
</script>