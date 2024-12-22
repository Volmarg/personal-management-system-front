<template>
  <div class="m-2 hover-zoom"
       :class="{
          [backgroundColorClass]: true,
       }"
  >
    <div class="flex flex-col p-2 w-full">
      <div class="flex items-start justify-start mb-2">
        <div class="text-left">
          <div class="text-sm font-bold">{{ name }}</div>
          <div class="text-xs text-gray-600">{{ description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  computed: {
    /**
     * @description get the block color class for type
     */
    backgroundColorClass(): string {
      switch (this.type) {
        case "simple":
          return "bg-green-200";
        case "medium":
          return "bg-yellow-200";
        case "hard":
          return "bg-red-200";
        case "hardcore":
          return "bg-gray-300";
        default:
          throw new BaseError(`Unsupported type: ${this.type}`)
      }
    }
  }
}
</script>
