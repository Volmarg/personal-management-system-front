<template>
  <form class="w-full max-w-xs mr-2 navbar-search">
    <div class="relative">
      <input type="search"
             placeholder="Search..."
             class="pl-10 pr-5 appearance-none h-10 w-full rounded-full text-sm focus:outline-none"
      >
      <button type="submit" class="absolute top-0 mt-3 left-0 ml-4">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
             stroke-linejoin="round" class="stroke-current h-4 w-4" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  name: "SearchInput"
}
</script>