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
      <span
          :class="{
            'num-text-wrapper-done': true
          }"
      >
          <span :class="{
            'done-wrapper': isDone,
            'bg-blue-500': isActive,
            'bg-green-500': !isActive
          }">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                class="svg-checkmark">
              <path
                  fill-rule="evenodd"
                  fill="white"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clip-rule="evenodd"
              />
            </svg>
          </span>
         <span
             class="text-classes"
             :class="{
                'text-blue-500': isActive
             }"
         >{{ label }}</span>
      </span>
  </a>

</template>

<script lang="ts">
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
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
    isDone: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLastStep: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>
