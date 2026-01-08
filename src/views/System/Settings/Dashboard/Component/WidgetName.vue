<template>
  <p>
    {{ name }}
    <fa icon="lock"
        class="text-red-500 text-tiny"
        v-if="isLocked"
    />
  </p>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
