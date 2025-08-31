<template>
  <a
      href="#"
      @click.prevent
      class="link-classes"
      :class="{
          'is-last-step': isLastStep,
          'cursor-pointer': canNavigate,
          'cursor-not-allowed': !canNavigate
       }"
  >
        <span :class="{
          'num-text-wrapper-active': isActive,
          'num-text-wrapper-inactive': !isActive,
        }">
          <span class="num-text">{{ stepNumber }}</span>
        </span>

    <span class="text-classes">{{ label }}</span>
  </a>

</template>
<script lang="ts">
export default {
  props: {
    canNavigate: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    stepNumber: {
      type: [Number, null],
      required: false,
      default: null,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>
