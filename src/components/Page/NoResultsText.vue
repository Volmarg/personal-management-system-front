<template>
  <p class="text-center">
    <span
        v-if="!!text"
        v-html="text"
    />
    <span v-else>{{ $t('generic.noResults') }}</span>
  </p>

  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: [String, null],
      required: false,
      default: null
    }
  }
}
</script>