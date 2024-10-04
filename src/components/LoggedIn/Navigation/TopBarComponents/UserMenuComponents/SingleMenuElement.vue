<template>
  <li class="dropdown-item">
    <router-link :to="toPath"
                 class="menu-element"
                 v-if="isLinkBased"
    >
      <span class="icon">
        <slot name="icon"></slot>
      </span>
      <span class="label">{{ label }}</span>
    </router-link>

    <span v-else
          class="menu-element"
    >
      <span class="icon">
        <slot name="icon"></slot>
      </span>
      <span class="label"
            :class="labelClasses"
      >{{ label }}</span>
    </span>
  </li>
</template>

<script lang="ts">

import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  name: "UserMenuSingleElement",
  props: {
    isLinkBased: {
      type: Boolean,
      required: false,
      default: true,
    },
    toPath: {
      type     : String,
      required : false,
      default  : null
    },
    label: {
      type     : String,
      required : true,
    },
    labelClasses: {
      type: Object,
      required: false,
      default: function () {
        return {};
      }
    }
  },
  created(): void {
    if (this.isLinkBased && !this.toPath) {
      throw BaseError("Menu element is link based yet path is empty!");
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-element {
  @apply flex flex-row items-center justify-start h-10 w-full px-2 cursor-pointer
}

.icon {
  max-width: 30px !important;
  @apply inline-block -mt-3
}

.label {
  @apply mx-2 align-middle
}
</style>
