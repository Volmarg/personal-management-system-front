<template>
  <li class="li-el">
    <DoneState
      :is-active="isActive"
      :is-last-step="isLastStep"
      :is-done="isDone"
      :step-number="stepNumber"
      :label="label"
      :can-navigate="canNavigate"
      v-if="isDone"
      :class="{
          'hover:opacity-75': canNavigate
      }"
    />

    <NotDoneState
      :is-active="isActive"
      :is-last-step="isLastStep"
      :step-number="stepNumber"
      :label="label"
      :can-navigate="canNavigate"
      v-else
      :class="{
        'hover:opacity-75': canNavigate
      }"
    />

    <!-- arrow -->
    <div
        class="div-with-arrow hidden lg:block"
        v-if="!isLastStep"
    >
      <svg
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
      >
        <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
        />
      </svg>
    </div>
  </li>
</template>

<script lang="ts">
import DoneState    from "@/components/Navigation/Steps/Step/Components/DoneState.vue";
import NotDoneState from "@/components/Navigation/Steps/Step/Components/NotDoneState.vue";

export default {
  components: {
    NotDoneState,
    DoneState
  },
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
