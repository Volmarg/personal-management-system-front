<template>
  <div class="flex justify-center">
    PROFILE
  </div>
</template>

<script lang="ts">


import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        currencyMultiplier: null,
      }
    }
  },
  components: {
  },
  methods: {
  },
  async beforeMount(): Promise<void> {
  }
}
</script>
