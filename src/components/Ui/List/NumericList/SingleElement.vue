<template>
  <li :class="classes"
      class="w-full flex items-center justify-start pb-2 pt-2 sm:p-4 bg-transparent shadow border-l-4 bg-white border-blue-500 mb-4 flex-col md:flex-row"
  >

    <span class="marker"
          :class="markerClasses"
    >
      <slot name="marker-content"></slot>
    </span>

    <div :class="contentClasses"
         class="w-full"
    >
      <slot name="general-content"></slot>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    classes: {
      type     : String,
      required : false,
      default  : '',
    },
    markerClasses: {
      type     : String,
      required : false,
      default  : "",
    },
    contentClasses: {
      type     : String,
      required : false,
      default  : "",
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';

@media all and(max-width: $phoneBreakingPoint + 'px') {
  ol div {
    margin: 0 !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

ol div {
  touch-action: manipulation;
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  margin: 1em 0;
  font-size: 20px;
  text-decoration: none;
  border-radius: .3em;
  transition: .3s ease-out;
  @apply  pt-0 pb-0 mt-1 mb-1
}

li {
  position: relative;
  * {
    @apply text-gray-700
  }
}

.marker {
  @apply text-blue-500 text-xl font-bold
}

</style>