<template>
  <div>
    <input type="checkbox"
           class="form-checkbox h-7 w-7 rounded-lg offer-selection-checkbox"
           v-model="isChecked"
           :checked="isChecked"
           @change="emitModelValueChange($event.target.checked)"
    >
    <asterisk-required v-if="isRequired"/>

    <input-violations :violations="errors"
                      v-if="!isValid"
    />

  </div>
</template>

<script lang="ts">
import AsteriskRequired  from "@/components/Form/AsteriskRequired.vue";
import InputViolations   from "@/components/Form/InputViolations.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "VueCheckbox",
  data(): ComponentData {
    return {
      isChecked: false,
    }
  },
  emit: [
    "pressEnter",
    'update:modelValue',
  ],
  props: {
    modelValue: {
      required:  false,
    },
    isRequired: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    hasErrors: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    errors: {
      type     : Array,
      required : false,
      default  : (): Array<string> => {
        return [];
      },
    },
  },
  components: {
    "asterisk-required" : AsteriskRequired,
    "input-violations"  : InputViolations,
  },
  computed: {
    /**
     * @description will check if input is valid. If it has any errors, or if the error is forced via prop
     */
    isValid(): boolean {
      return (
              !this.hasErrors
          &&  0 === this.errors.length
      );
    }
  },
  methods: {
    /**
     * @description emit the model value update on change
     */
    emitModelValueChange(newValue: boolean): void {
      this.$emit('update:modelValue', newValue);
    },
    /**
     * @description toggle the check state
     */
    toggle(): void {
      this.isChecked = !this.isChecked;
      this.emitModelValueChange(this.isChecked);
    }
  },
  created(){
    this.isChecked = this.modelValue;
  },
  watch: {
    modelValue() {
      this.isChecked = this.modelValue;
    }
  }
}
</script>
