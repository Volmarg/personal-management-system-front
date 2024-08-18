<template>
  <div class="w-full flex items-center justify-start p-4 text-white p-2"
       v-if="isShown"
       :class="{
          [alertTypeToClass]: true
       }"
  >
    <div class="flex-shrink">
      <svg stroke="currentColor" fill="none" stroke-width="3" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="mr-2 stroke-current h-5 w-5" height="1em" width="em"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <div class="flex-grow"
         :style="{
            'font-size': `${fontSize}px`
         }"
    >{{ text }}</div>
    <div class="flex-shrink"
         v-if="canBeClosed"
    >
      <button class="ml-auto flex items-center justify-center">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
             stroke-linejoin="round" class="stroke-current h-4 w-4" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import ObjectTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ObjectTypeProcessor";

enum AlertTypesEnums {
  error   = "error",
  warning = "warning",
  success = "success",
  info    = "info",
}

/**
 * @link https://v1.tailwindcss.com/components/alerts
 */
export default {
  name: "Alert",
  props: {
    text: {
      type     : String,
      required : true,
    },
    isShown: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    type: {
      type     : String,
      required : false,
      default: (): string => {
        return AlertTypesEnums.success;
      },
      validator: (value: string): boolean => {
        return ObjectTypeProcessor.hasKey(AlertTypesEnums, value);
      }
    },
    /**
     * @description not supported yet
     */
    canBeClosed: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    fontSize: {
      type     : Number,
      required : false,
      default  : 15,
    }
  },
  computed: {
    /**
     * @description will return tailwind based css class for given alert type, meaning that `alert type` will
     *              have its corresponding css class returned in here
     */
    alertTypeToClass(): string {
      switch(this.type){
        case AlertTypesEnums.error:
          return 'bg-red-500';

        case AlertTypesEnums.warning:
          return 'bg-orange-700';

        case AlertTypesEnums.info:
          return 'bg-blue-500';

        default:
          return 'bg-green-500';
      }
    }
  }
}

export {AlertTypesEnums};
</script>

<style>
.toast {
  opacity: 0.95 !important;
}

</style>
