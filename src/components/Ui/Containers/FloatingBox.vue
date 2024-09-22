<template>
  <transition-preconfigured>
    <div class="fixed right-5 bottom-2 floating-box-main-wrapper hover:opacity-70">

        <div :class="{
          'widget'                     : showBackground,
          'w-full p-4'                 : showBackground,
          'rounded-lg'                 : showBackground,
          'bg-white'                   : showBackground,
          'border'                     : showBackground,
          'border-gray-100'            : showBackground,
          'dark:bg-gray-900'           : showBackground,
          'dark:border-gray-800'       : showBackground,
          'floating-box-inner-wrapper' : true,
        }">
          <div class="p-0 m-0 select-none">

            <slot></slot>

          </div>
        </div>

    </div>
  </transition-preconfigured>
</template>

<script lang="ts">
import TransitionPreconfigured from "@/components/Global/TransitionPreconfigured.vue";
export default {
  name: "FloatingBox",
  components: {
    "transition-preconfigured": TransitionPreconfigured
  },
  props: {
    showBackground: {
      type     : Boolean,
      required : false,
      default  : true,
    }
  }
}
</script>

<style lang="scss">
  .floating-box-main-wrapper {
    z-index: 3;
  }

  .floating-box-inner-wrapper {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50px;
  }
</style>