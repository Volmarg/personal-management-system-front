<template>
  <div class="w-full flex items-center justify-start p-4 bg-transparent shadow border-l-4 p-4"
       :class="{
          [borderColorClass]: true
       }"
  >
    <section class="flex flex-row flex-wrap justify-between w-full">
      <div v-html="leftContent"
           v-if="isAnyContentDefined"
      ></div>
      <div v-html="centerContent"
           v-if="isAnyContentDefined"
      ></div>
      <div v-html="rightContent"
           v-if="isAnyContentDefined"
      ></div>
      <slot></slot>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name :"ColorBorderBar",
  props: {
    leftContent: {
      type     : String,
      required : false,
    },
    centerContent: {
      type     : String,
      required : false,
    },
    rightContent: {
      type     : String,
      required : false,
    },
    borderColorClass: {
      type     : String,
      required : false,
      default  : 'border-blue-500'
    },
  },
  computed: {
    /**
     * @description check if any content is defined at all
     */
    isAnyContentDefined(): boolean {
      return (
              !!this.leftContent
          ||  !!this.rightContent
          ||  !!this.centerContent
      )
    }
  }
}
</script>