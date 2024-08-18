<template>
  <transition mode="out-in" name="component-animation">
    <keep-alive>
      <component :is="component"
                 :key="component.name"
                 v-if="isVisible"
      ></component>
    </keep-alive>
  </transition>
</template>

<script lang="ts">

/**
 * @description this works pretty much like normal <component :is>  but it supports transition out-of-box,
 *              however does not support passing props to component at the moment
 *              as it was no need to provide such logic when building this component
 */
export default {
  name: "TransitionedComponent",
  props: {
    component: {
      required : true,
      default  : (): Record<string, unknown> => {
        return {};
      },
    },
    isVisible: {
      type     : Boolean,
      required : true
    }
  }
}
</script>

<style scoped>
/** These classes below are used by vue.js thus ide does not recognize that they are being used */
.component-animation-enter-active,
.component-animation-leave-active {
  transition: opacity 200ms ease;
}

.component-animation-enter-from,
.component-animation-leave-active {
  opacity: 0;
}
</style>