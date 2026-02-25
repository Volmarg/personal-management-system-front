<template>
  <div :class="topWrapperClasses">

    <!-- Floating label inside input -->
    <div v-if="isLabelInside">
      <div class="w-full flex flex-row">

        <about :text="questionMarkText"
                class="align-self-center"
                v-if="isQuestionMarkTextSet"
        />

        <div class="floating-input relative w-full">
          <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 :class="{
                    'border-red-500'      : !isValid && isDisabled,
                    'gray-border'         : isGray || isDisabled,
                    'bg-gray-100'         : isDisabled,
                    'pointer-events-none' : isDisabled,
                    'touch-action-none'   : isDisabled,
                    [inputClasses]        : true,
                 }"
                 :type="type"
                 :step="step"
                 :min="min"
                 :maxlength="maxChars"
                 :placeholder="(isPlaceholderSet ? placeholder : label)"
                 :value="value"
                 @input="onInput($event)"
                 @keydown="onKeyDown($event)"
                 @paste="onPaste($event)"
                 @keypress.enter="$emit('press-enter')"
                 :readonly="isDisabled"
                 ref="input"
          />
          <label class="absolute top-0 left-0 px-3 py-2 h-full pointer-events-none touch-action-none transform origin-left transition-all duration-100 ease-in-out text-gray-500"
                 :class="
                 {
                   ...labelClasses,
                   'gray-text': true,
                 }"
          >
            {{ label }}
            <asterisk-required v-if="isRequired"/>
          </label>
        </div>
      </div>
    </div>

    <!-- Standard label above input -->
    <div v-else>
      <label class="block text-gray-700 text-sm font-bold mb-2"
             :class="
                 {
                   ...labelClasses,
                   'gray-text': true,
                 }"
      >
        {{ label }} <asterisk-required v-if="isRequired"/>
      </label>
      <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{
            'border-red-500'      : !isValid && isDisabled,
            'gray-border'         : isGray || isDisabled,
            'bg-gray-100'         : isDisabled,
            'pointer-events-none' : isDisabled,
            'touch-action-none'   : isDisabled,
          }"
          :type="type"
          :step="step"
          :min="min"
          :maxlength="maxChars"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('update:modelValue', $event.target.value)"
          @keydown="onKeyDown($event)"
          @paste="onPaste($event)"
          @keypress.enter="$emit('press-enter')"
          :readonly="isDisabled"
          novalidate="novalidate"
          ref="input"
      >

    </div>

    <input-violations :violations="errors"
                      v-if="!isValid"
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
      value: null,
    }
  },
  emit: [
    "pressEnter",
  ],
  props: {
    min: {
      type: [Number, null],
      default: null,
      required: false,
    },
    maxChars: {
      type: [Number, null],
      default: null,
      required: false,
    },
    step: {
      type: Number,
      default: 1,
      required: false,
    },
    topWrapperClasses: {
      type     : String,
      required : false,
      default  : "mb-6",
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
    questionMarkText: {
      type     : [String, null],
      required : false,
      default  : null,
    },
    labelClasses: {
      type       : Object,
      required   : false,
      return: () : Record<string, boolean> => {
        return {};
      },
    },
    modelValue: {
      required:  false,
    },
    type: {
      type     : String,
      required : true,
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
    isLabelInside: {
      type     : Boolean,
      required : false,
      default  : true,
    },
    inputClasses: {
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
     * @description will check if the question mark text is set or not
     */
    isQuestionMarkTextSet(): boolean {
      return !StringTypeProcessor.isEmptyString(this.questionMarkText);
    },
    /**
     * @description will check if placeholder is set or not
     */
    isPlaceholderSet(): boolean{
      return !StringTypeProcessor.isEmptyString(this.placeholder);
    },
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
     * @description emits modelValue event
     */
    onInput(event: InputEvent): void {
      this.$emit('update:modelValue', event.target.value)
    },
    /**
     * @description this is used in StepHandleData.vue
     */
    setValue(value: unknown): void {
      this.value = value;
    },
    /**
     * @description There is some annoying thing with `input type number`: it's by default allowed to input "++"
     *              "9-8+3", "e+-9", etc. and that's considered valid.
     *
     *              This hack will block user from inserting such values. This also means that negative values cannot
     *              be used with `number` type. If these will be needed in future for whatever reason then will need
     *              to provide handling for them - that's however very hard to achieve.
     *
     *              User can still paste string such as "e+9", but if he will submit it then backend will either validate
     *              the input or will crash so nobody really cares.
     */
    onKeyDown(event: KeyboardEvent) {
      if (
              this.type === "number"
          &&  ["e", "E", "+", "-"].includes(event.key)
      ) {
        event.preventDefault();
      }
    },
    /**
     * @description basically same info as in {@see onKeyDown}
     */
    onPaste(event: ClipboardEvent) {
      let clipboardData: string | null = event.clipboardData?.getData('text/plain') ?? null;
      if (
              this.type === "number"
          &&
          (
                  null === clipboardData
              ||  clipboardData.includes('e')
              ||  clipboardData.includes('E')
              ||  clipboardData.includes('+')
              ||  clipboardData.includes('-')
          )
      ) {
        event.preventDefault()
      }
    }
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
  .floating-input>input::placeholder {
    color: transparent;
  }

  .floating-input>input:focus,
  .floating-input>input:not(:placeholder-shown) {
    @apply pt-4
  }

  .floating-input>input~label,
  .floating-input>input:not(:placeholder-shown)~label {
    @apply opacity-75 scale-75 -translate-y-2 translate-x-1;
  }

  .gray-border:not(:focus) {
    border: 1px solid rgba(0, 0, 0, 0.15)
  }

  .gray-text {
    color: rgba(0, 0, 0, 0.5)
  }
</style>