<template>
  <component mode="out-in"
             name="animation"
             :is="getTransitionComponentName"
             :tag="tag"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import {Component, Transition, TransitionGroup} from "vue";

export default {
  name: "TransitionPreconfigured",
  props: {
    /**
     * @description decide if that's normal transition or group transition
     */
    isGroup: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    tag: {
      type     : String,
      required : false,
      default  : "div",
    }
  },
  computed: {
    /**
     * @description will return used transition component
     */
    getTransitionComponentName(): Component {
      if(this.isGroup){
        return TransitionGroup;
      }

      return Transition;
    }
  }
}
</script>

<style scoped>
/** These classes below are used by vue.js thus ide does not recognize that they are being used */
.animation-enter-active,
.animation-leave-active {
  transition: opacity 200ms ease;
}

.animation-enter-from,
.animation-leave-active {
  opacity: 0;
}
</style>