<template>
  <div class="section-title w-full pt-3"
       :class="mainWrapperClasses"
  >
    <div :class="centerWrapperClasses"
    >
      <div class="flex w-full"
           :class="{
              'justify-center'     : isContentCentered,
              'justify-between'    : isContentEquallyDistributed,
              [this.flexDirection] : true,
           }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  name: "Row",
  props: {
    flexDirection:{
      type     : String,
      required : false,
      default  : "flex-row",
      validator: (value: string): boolean => {
        let allowedValues = ["flex-row", "flex-col"];
        if (!allowedValues.includes(value)) {
          throw new BaseError(`This value "${value}" is not allowed for property "Row::flexDirection", allowed are: ` + JSON.stringify(allowedValues));
        }
        return true;
      }
    },
    isContentCentered: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    isContentEquallyDistributed: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    bottomMarginSize: {
      type: Number,
      required: false,
      default: 6
    },
    centerWrapperBaseClasses: {
      type     : String,
      required : false,
      default  : 'flex flex-col items-center justify-between',
    }
  },
  computed: {
    /**
     * @description return dynamically created classes for the main wrapper DOM element
     */
    mainWrapperClasses(): Record<string, boolean> {
      return {
        [`mb-${this.bottomMarginSize}`]: true
      }
    },
    /**
     * @description return dynamically created classes for the center wrapper DOM element
     */
    centerWrapperClasses(): Record<string, boolean> {
      return {
        "mb-4"                          : (0 !== this.bottomMarginSize),
        [this.centerWrapperBaseClasses] : true
      }
    }
  }
}
</script>