<template>
  <div>
    <div class="relative w-full border rounded transition-colors duration-200"
         :class="{
            'border-blue-500 ring-1 ring-blue-500' : isFocused,
            'border-gray-500 bg-white': !isGray && !isDisabled,
            'border-gray-300 bg-gray-100': isDisabled,
         }"
    >
      <label class="absolute top-1.5 left-3 text-gray-400 z-10 pointer-events-none">
        {{label}}  <asterisk-required v-if="isRequired"/>
      </label>

      <textarea class="w-full pt-7 pb-2 px-3 text-sm text-gray-800 rounded bg-transparent focus:outline-none border-none outline-none resize-y block custom-textarea-mask"
                :class="{
                    'border-red-500 custom-textarea-mask-red'  : !isValid && !isDisabled,
                    'bg-gray-100 custom-textarea-mask-gray'    : isDisabled ,
                    [textareaClasses] : true,
                 }"
                :maxlength="maxChars"
                :placeholder="(isPlaceholderSet ? placeholder : label)"
                :value="value"
                :rows="rows"
                @input="onInput($event)"
                :readonly="isDisabled"
                @focus="isFocused = true"
                @blur="isFocused = false"
      />

    </div>

    <input-violations :violations="errors"
                      v-if="!isValid"
                      class="mt-1"
    />
  </div>
</template>

<script lang="ts">
import AsteriskRequired  from "@/components/Form/AsteriskRequired.vue";
import InputViolations   from "@/components/Form/InputViolations.vue";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "VueInput",
  data(): ComponentData {
    return {
      isFocused: false,
      value: null,
    }
  },
  props: {
    maxChars: {
      type: [Number, null],
      default: null,
      required: false,
    },
    rows: {
      type: Number,
      default: 2,
      required: false,
    },
    isDisabled: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    isGray: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    modelValue: {
      required:  false,
    },
    label: {
      type     : String,
      required : true,
    },
    placeholder: {
      type     : String,
      required : false,
      default  : null,
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
    textareaClasses: {
      type: String,
      required: false,
      default: "",
    }
  },
  components: {
    "asterisk-required" : AsteriskRequired,
    "input-violations"  : InputViolations,
  },
  computed: {
    /**
     * @description will check if placeholder is set or not
     */
    isPlaceholderSet(): boolean{
      return !StringTypeProcessor.isEmptyString(this.placeholder);
    },
    /**
     * @description will check if textarea is valid. If it has any errors, or if the error is forced via prop
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
     * @description emits modelValue event
     */
    onInput(event: InputEvent): void {
      this.$emit('update:modelValue', event.target.value)
    },
  },
  beforeMount(): void {
    this.value = this.modelValue;
  },
  watch: {
    /**
     * @description watch the modelValue change and:
     *              - update value,
     */
    modelValue(): void {
      this.value = this.modelValue;
    }
  }
}
</script>

<style lang="scss" scoped>
$gray100: rgba(243, 244, 246);
$red500: rgba(239, 68, 68);

// make the label fixed
.custom-textarea-mask {
  mask-image: linear-gradient(to bottom, transparent 26px, black 26px);
  -webkit-mask-image: linear-gradient(to bottom, transparent 26px, black 26px);
}

.custom-textarea-mask-red {
  mask-image: linear-gradient(to bottom, transparent 26px, $red500 26px) !important;
  -webkit-mask-image: linear-gradient(to bottom, transparent 26px, $red500 26px) !important;
}

.custom-textarea-mask-gray {
  mask-image: linear-gradient(to bottom, transparent 26px, $gray100 26px) !important;
  -webkit-mask-image: linear-gradient(to bottom, transparent 26px, $gray100 26px) !important;
}

label {
  font-size: 11px;
}

textarea {
  @apply text-base
}
</style>