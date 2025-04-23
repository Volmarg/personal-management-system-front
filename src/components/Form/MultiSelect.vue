<template>
  <div
      class="flex justify-between w-full"
      :class="{
        'h-full'           : isFullHeight,
        'tags-multiselect' : isTagMode,
      }"
      v-if="isVisible"
  >
    <section
        class="w-full"
        :class="{
          'h-full': isFullHeight
        }"
    >
      <div
          class="floating-input relative w-full"
          :class="{
            'h-full': isFullHeight
          }"
      >
        <multiselect class="multiselect-element appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     v-model="value"
                     :label="selectedLabelSource"
                     :options="usedOptions"
                     :mode="mode"
                     :can-clear="canClear"
                     :searchable="isSearchable"
                     :create-option="canCreateOption"
                     :show-options="canShowOptionList"
                     :classes="getClasses"
                     :disabled="disabled"
                     :class="{
                       'h-full': isFullHeight
                     }"
                     :max="maxOptions"
                     @focusout="onFocusOut"
                     @select="onMultiSelectEvent('select')"
                     @deselect="onMultiSelectEvent('deselect')"
                     @keydown.delete="onMultiSelectEvent('deselect')"
                     @keydown.enter="regainFocus('multiselectInput')"
                     @clear="onMultiSelectEvent('clear')"
                     @paste="onMultiSelectEvent('paste')"
                     autocomplete="new-street-address"
                     ref="multiselectInput"
        >
          <template #option="{ option }"
                    v-if="areOptionsObjects"
          >
            <div class="flex flex-row justify-center">
              <img class="character-option-icon"
                   :src="option.image"
                   v-if="option.image"
              />

              <component :is="option.component"
                         v-bind="option.props"
                         v-if="areComponentsProvided"
                         class="align-self-end border-gray-200 border"
              />

              <span class="align-self-end ml-2">
                {{ option.label }}
                <small v-if="areDescriptionsProvided"
                       class="text-gray-400 italic text-tiny"
                >
                  - {{ option.description }}
                </small>
              </span>
            </div>
          </template>

        </multiselect>
        <label class="absolute top-0 left-0 px-3 h-full pointer-events-none touch-action-none transform origin-left transition-all duration-100 ease-in-out text-gray-500"
               :class="labelClasses"
        >
          {{ label }}

          <span v-if="showCountInLabel && isAnyOptionSelected">
            ({{countSelectedOptions}})
          </span>

          <asterisk-required v-if="required" />
        </label>
      </div>

      <input-violations
          :violations="violations"
          v-if="!isValid"
      />
    </section>
  </div>
</template>

<script lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css';

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseError from "@/scripts/Core/Error/BaseError";

import AsteriskRequired from "@/components/Form/AsteriskRequired.vue";
import InputViolations  from "@/components/Form/InputViolations.vue";

import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

import MultiselectFocusMixin from "@/components/Form/mixin/MultiselectFocusMixin.vue";

/**
 * @link https://github.com/vueform/multiselect#configuration
 * @link https://jsfiddle.net/xf0jzoct/
 */
export default {
  name: "VueSelect",
  data(): ComponentData {
    return {
      value: null,
      /**
       * @description multiselect has some issues with updating the options, if new options is added to the array of options
       *              then the label is visible twice in the select. Debugged this already and the options are created properly.
       *              Something is wrong in the library itself. Found out that hiding the component for the moment
       *              when options are updated works fine. This "blink" is not visible for users - at least for now.
       */
      isVisible: true,
      modes: {
        single : "single",
        multi  : "multiple",
        tags   : "tags",
      },
      usedOptions: [],
    }
  },
  props: {
    /**
     * @description defines property that will be taken from options to display the selected label
     */
    selectedLabelSource: {
      type: String,
      required: false,
      default: 'label'
    },
    canClear: {
      type: Boolean,
      required: false,
      default: true,
    },
    showCountInLabel: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    disabled: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    maxOptions: {
      type     : Number,
      required : false,
      default  : -1
    },
    isSearchable: {
      type     : Boolean,
      required : false,
      default  : true,
    },
    allowShowOptionsList: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    allowCreateOptions: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    isFullHeight: {
      type: Boolean,
      required: false,
      default: true,
    },
    modelValue: {
      required:  false,
    },
    hasErrors: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    violations: {
      type     : Array,
      required : false,
      default  : (): Array<void> => {
        return [];
      }
    },
    mode: {
      type     : String,
      required : false,
      default  : "single",
      validator: (value: string): boolean => {
        /** @link https://github.com/vueform/multiselect#configuration [mode] */
        let allowedModes = ["single", "multiple", "tags"]
        if (!allowedModes.includes(value)) {
          throw new BaseError(`Unsupported mode. Got: '${value}', allowed are: ${JSON.stringify(allowedModes)}`);
        }

        return true;
      }
    },
    required: {
      type     : Boolean,
      required : false,
      default  : false
    },
    options: {
      type     : Array,
      required : false,
      default  : function() {
        return [];
      }
    },
    tagClasses: {
      type     : [String, null],
      required : false,
      default  : null,
    },
    label: {
      type     : String,
      required : false,
      default  : "",
    }
  },
  mixins: [
    MultiselectFocusMixin
  ],
  emits: [
    "change",
    "select",
    "deselect",
    "clear",
    "paste",
  ],
  components: {
    "multiselect"       : Multiselect,
    "input-violations"  : InputViolations,
    "asterisk-required" : AsteriskRequired,
  },
  methods: {
    /**
     * @description if an option has key "selected" then this option will be selected by default,
     *              if multiple options have the "selected" set to true then the first is picked,
     *              and rest gets ignored.
     */
    preselectValueHandler(): void {
      if (this.modelValue) {
        this.setValueForMode(this.modelValue);
        return;
      }

      for (let option of this.usedOptions) {
        if (option.selected) {
          this.setValueForMode(option.value);
          break;
        }
      }
    },
    /**
     * @description sets the value based on the used mode
     */
    setValueForMode(value): void {
      if (this.isTagMode) {
        if (StringTypeProcessor.isEmptyString()) {
          this.value = [];
          return;
        }

        this.value = [value];
        return;
      }

      this.value = value;
    },
    /**
     * @description handles passing forward the multiselect value,
     *              The ticks inside are wicked but the problem is that
     *              - the emitted events do not contain the proper value,
     *              - on first tick part of the values are still incorrect,
     *              - on second tick the values are then proper,
     */
    onMultiSelectEvent(eventName: string): void {
      this.$nextTick(() => {
        this.$nextTick( () => {
          this.$emit(eventName, this.value);
        })
      });
    },
    /**
     * @description unsets the selected value
     */
    clear(): void {
      this.value = null;
    },
    /**
     * @description creates array of used options. This method is necessary especially for the tags mode, where it turns
     *              out that sometimes the "v-model" provided values will not be selected if these are not present in options.
     */
    rebuildUsedOptions(): void {
      if (this.isTagMode && this.options.length === 0 && this.modelValue && !(this.modelValue.length === 1 && this.modelValue[0] === null)) {
        this.usedOptions = [];
        for (let value of this.modelValue) {
          this.usedOptions.push({
            label: value,
            value: value,
          })
        }

        return;
      }
      this.usedOptions = this.options;
    }
  },
  computed: {
    /**
     * @description check if multiselect is in "tags" mode
     */
    isTagMode(): boolean {
      return (this.mode === this.modes.tags);
    },
    /**
     * @description will check if select is valid. If it has any errors, or if the error is forced via prop
     */
    isValid(): boolean {
      return (
              !this.hasErrors
          &&  0 === this.violations.length
      );
    },
    /**
     * @description counted amount of selected options
     */
    countSelectedOptions(): number {
      if(
              StringTypeProcessor.isEmptyString(this.value)
          ||  ArrayTypeProcessor.isEmpty(this.value)
      ){
        return 0;
      }

      return Object.keys(this.value).length
    },
    /**
     * @description check if any option is selected
     */
    isAnyOptionSelected(): boolean {
      return this.countSelectedOptions > 0;
    },
    /**
     * @description check if options can be listed on click
     */
    canShowOptionList(): boolean {
      return !this.isTagMode || this.allowShowOptionsList;
    },
    /**
     * @description check if options can be created if they don't exist
     */
    canCreateOption(): boolean {
      return (
              this.isTagMode
          &&  this.allowCreateOptions
      );
    },
    /**
     * @description return extra classes for label
     */
    labelClasses(): Record<string, boolean> {
      return {
        'py-1' : this.isModeSingle,
        'py-2' : !this.isModeSingle,
      }
    },
    /**
     * @description check if this is just a normal select with one-option-select-able only
     */
    isModeSingle(): boolean {
      return (this.mode === this.modes.single);
    },
    /**
     * @description will check if image is provided for ALL options
     */
    areImagesProvided(): boolean {
      for (let option of this.usedOptions) {
        if ("object" === typeof option) {

          let checkedOption: Record<string, string> = option;
          if (StringTypeProcessor.isEmptyString(checkedOption.image)) {
            return false;
          }

        }
      }

      return true;
    },
    /**
     * @description will check if description is provided for ALL options
     */
    areDescriptionsProvided(): boolean {
      for (let option of this.usedOptions) {
        if ("object" === typeof option) {

          let checkedOption: Record<string, string> = option;
          if (StringTypeProcessor.isEmptyString(checkedOption.description)) {
            return false;
          }

        }
      }

      return true;
    },
    /**
     * @description will check if imag is provided for ALL options
     */
    areComponentsProvided(): boolean {
      let hasProps = true;
      for (let option of this.usedOptions) {
        if ("object" === typeof option) {

          let checkedOption: Record<string, string> = option;
          if (StringTypeProcessor.isEmptyString(checkedOption.component)) {
            return false;
          }

          if (StringTypeProcessor.isEmptyString(checkedOption.props)) {
            hasProps = false;
          }
        }
      }

      if (!hasProps) {
        throw new BaseError("Not all components provided as options for MultiSelect got props provided alongside");
      }

      return true;
    },
    /**
     * @description check if provided options are objects
     */
    areOptionsObjects(): boolean {
      for (let option of this.usedOptions) {
        if ("object" !== typeof option) {
          return false;
        }

        let checkedOption: Record<string, string> = option;
        if(undefined === checkedOption.value || null === checkedOption.value){
          throw new BaseError("Provided MultiSelect option, has no property named `value`: " + JSON.stringify(option));
        }

        if(undefined === checkedOption.label || null === checkedOption.label){
          throw new BaseError("Provided MultiSelect option, has no property named `value`: " + JSON.stringify(option));
        }

      }

      return true;
    },
    /**
     * @description will return all classes generally
     */
    getClasses(): Record<string, string>{
      return {
        tag: (
              !TypeChecker.isNull(this.tagClasses)
            ? (this.tagClasses + this.getOriginalTagClasses)
            : (this.getOriginalTagClasses + 'bg-green-500') // bg-green is original color, but keeps overwriting provided bg- thus is separated
        )
      }
    },
    /**
     * @description returns original tag classes supplied when installing the multiselect package
     */
    getOriginalTagClasses(): string {
      return ' text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center break-all tag ';
    }
  },
  mounted(): void {
    this.attachOnFocusOutHandler();
    this.preselectValueHandler();
    this.rebuildUsedOptions();
  },
  watch: {
    options: {
      deep: true,
      handler(): void {
        this.rebuildUsedOptions();
      }
    },
    /**
     * Emit the value when multiselect model changes,
     * Should normally work with multi-select built in `change` event, but ain't working
     */
    value: {
      deep: false,
      handler(newValue: Array<string>): void {
        this.$emit("update:modelValue", newValue);
      }
    },
    modelValue(newValue: unknown): void {
      if (this.isTagMode && !TypeChecker.isNull(newValue) && !TypeChecker.isArray(newValue)) {
        throw new BaseError("New value in tags mode should be either null or an array!", {value: newValue});
      }

      this.rebuildUsedOptions();
      this.$nextTick(() => {
        this.value = newValue;
      })
    }
  }
}
</script>

<style lang="scss">
// multiselect itself
.multiselect {
  border: 1px black solid;

  &.is-active {
    box-shadow: 0 0 0 var(--ms-ring-width, 2px) var(--ms-ring-color,rgba(59, 130, 246, 1));
    border: none;
  }

  .multiselect-tags-search {
    @apply h-full
  }

  .multiselect-tags-search:focus {
    outline: none !important;
    border: none !important;
    outline-offset: 0 !important;
    box-shadow: 0 1px 1px rgba(0,0,0,0.1) !important;
  }

  .multiselect-dropdown {
    .is-selected {
      @apply bg-blue-500;
    }
  }

  .multiselect-tags {
    max-height: 29px;
    overflow-y: scroll;
  }

  .multiselect-search {
    &:focus {
      border: none;
    }
  }
}

// Floating label in input
.floating-input .multiselect-element::placeholder {
  color: transparent;
}

.floating-input .multiselect-element:focus-within,
.floating-input .multiselect-element:not(:placeholder-shown) {
  @apply pt-4
}

.floating-input .multiselect-element:focus-within~label,
.floating-input .multiselect-element:not(:placeholder-shown)~label {
  @apply opacity-75 scale-75 -translate-y-2 translate-x-1;
}

// Supporting image in select
$imageSize: 30px;
.multiselect-option {
  img {
    width: $imageSize;
    height: $imageSize;

    border-radius: 50%;
    margin-right: 8px;
  }
}

// fix- caret being on top of sidebar / modal
.multiselect-caret {
  z-index: 9;
}

.multiselect-dropdown, .multiselect-options {
  overscroll-behavior: contain;
}
</style>