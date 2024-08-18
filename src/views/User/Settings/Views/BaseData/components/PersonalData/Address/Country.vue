<template>
  <div>

  </div>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @description this component is not supporting v-model on purpose, which is some issue with the component not passing
 *              forward the `update:modelValue` on change, all the events are emitted properly but this one not,
 *              thus using the "change" emission
 */
export default {
  data(): ComponentData {
    return {
      selectedCountry: null,
    }
  },
  props: {
    violations: {
      type     : Array,
      required : true,
    },
    modelValue: {
      required: false,
    },
    initialValue: {
      type     : String,
      required : true,
    }
  },
  emits: [
    "change"
  ],
  computed: {
    /**
     * @description will return the language data in form of Country Array
     */
    allSupportedCountriesData() {

      return [];
    },
  },
  mounted(): void {
    this.selectedCountry = this.initialValue.toUpperCase();
  }
}
</script>