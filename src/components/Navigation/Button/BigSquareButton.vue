<template>
  <div :class="{
    'inactive-wrapper w-1/4': !isActive,
    'active-wrapper w-1/4'  : isActive,
    'flex-col'              : !isIconSet,
    'w-full'                : isFullWidth,
    'max-w-sm'              : !isFullWidth,
  }">
    <div class="flex-shrink-0 w-8"
         v-show="isIconSet"
    >
      <span class="h-8 w-8 text-white flex items-center justify-center text-lg font-display font-bold"
            ref="iconSlotWrapper"
      >
        <slot name="icon"></slot>
      </span>
    </div>
    <div class="flex flex-col w-full ml-4"
         v-if="isBottomTextSet || isTopTextSet"
    >
      <div class="text-sm font-bold"
           v-if="isTopTextSet"
      >
        {{ topText }}
      </div>
      <div class="text-sm"
           v-if="isBottomTextSet"
      >
        {{ bottomText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "BigSquareButton",
  data(): ComponentData {
    return {
      isIconSet: false,
    }
  },
  props: {
    isFullWidth: {
      type     : Boolean,
      required : false,
      default  : true,
    },
    isActive: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    topText: {
      type     : String,
      required : false,
      default  : "",
    },
    bottomText: {
      type     : String,
      required : false,
      default  : "",
    }
  },
  computed: {
    /**
     * @description check if passed in "topText" prop is not an empty string,
     */
    isTopTextSet(): boolean {
      return !StringTypeProcessor.isEmptyString(this.topText);
    },
    /**
     * @description check if passed in "bottomText" prop is not an empty string,
     */
    isBottomTextSet(): boolean {
      return !StringTypeProcessor.isEmptyString(this.bottomText);
    }
  },
  methods: {
    /**
     * @description will check if the icon inside the icon slot is set,
     */
    checkIsIconSet(): boolean {
      return (
              this.$refs.iconSlotWrapper.innerHTML.trim().length > 0
          ||  this.$refs.iconSlotWrapper.innerText.trim().length > 0
      );
    },
  },
  mounted(): void {
    this.isIconSet = this.checkIsIconSet();
  }
}
</script>

<style lang="scss" scoped>

.common-for-wrapper {
  @apply flex items-center p-2 justify-start cursor-pointer bg-blue-500 text-white;
}

.active-wrapper {
  @apply common-for-wrapper border-none;
}

.inactive-wrapper {
  @apply common-for-wrapper hover:opacity-100 hover:bg-blue-500 opacity-60 border-b-4 border-blue-900;
}
</style>