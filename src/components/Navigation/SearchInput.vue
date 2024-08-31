<template>
  <form class="w-full max-w-xs mr-2 navbar-search">
    <div class="relative">
      <input type="search"
             :placeholder="$t('generic.form.search.placeholder')"
             class="pl-10 pr-5 appearance-none h-10 w-full rounded-full text-sm focus:outline-none"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
      >
      <button type="submit" class="absolute mt-3 left-0 ml-4 cursor-default">
        <fa icon="search"
            class="text-xl text-gray-500"
        />
      </button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: "SearchInput",
  props: {
    modelValue: {
      required:  false,
    },
  }
}
</script>