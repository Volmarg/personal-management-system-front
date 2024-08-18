<template>
  <section :class="wrapperClasses">
    <label class="block text-gray-700 text-sm font-bold mb-2"
           :class="labelClasses"
    >
      {{ label }}
    </label>
    <slider v-model="value"
            :min="min"
            :max="max"
            @update="$emit('update', value)"
            class="mt-10"
    />
  </section>
</template>

<script lang="ts">
import "@vueform/slider/themes/default.css";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import Slider          from '@vueform/slider'

/**
 * @link https://github.com/vueform/slider
 * @link https://jsfiddle.net/0Lp1bqyv/
 */
export default {
  name: "FormRange",
  data(): ComponentData {
    return {
      value: [],
    }
  },
  props: {
    min: {
      type     : Number,
      required : true,
    },
    max: {
      type     : Number,
      required : true,
    },
    labelClasses: {
      type       : Object,
      required   : false,
      return: () : Record<string, boolean> => {
        return {};
      },
    },
    wrapperClasses: {
      type       : Object,
      required   : false,
      return: () : Record<string, boolean> | string => {
        return {};
      },
    },
    label: {
      type     : String,
      required : false,
    }
  },
  components: {
    "slider": Slider,
  },
  emits: [
    "update"
  ],
  methods: {
    /**
     * @description will set initial values of the range
     */
    setInitialValues(): void {
      this.value = [this.min, this.max];
    }
  },
  created(): void {
    this.setInitialValues();

    // this is necessary to catch the initial values
    this.$emit('update', this.value)
  },
  watch: {
    max() {
      this.setInitialValues();
    },
    min() {
      this.setInitialValues();
    }
  }
}
</script>

<style lang="scss">
.slider-target{
  .slider-tooltip, .slider-connect {
    @apply bg-blue-500 border-blue-400;
  }

  .slider-tooltip::before{
    border-top-color: rgba(59, 130, 246, var(--tw-bg-opacity));
  }

  .slider-handle:focus {
    box-shadow: 0 0 0 var(--slider-handle-ring-width, 3px) var(--slider-handle-ring-color, rgba(59, 130, 246, 0.32)), var(--slider-handle-shadow, .5px .5px 2px 1px rgba(59, 130, 246, 0.32));
  }
}
</style>