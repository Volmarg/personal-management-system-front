<template>
  <div v-tippy="{
          content: 'Toggle dev bar'
        }"
       @click="togglePinState()"
       class="cursor-pointer hover:opacity-70"
  >
    <la svg-icon-name="thumbtack-solid"
        color="blue"
        font-size="30"
    />
  </div>
</template>

<script lang="ts">

import LocalStorageService            from "@/scripts/Core/Services/Storage/LocalStorageService";
import DevelopmentLocalStorageService from "@/scripts/Core/Services/Storage/DevelopmentLocalStorageService";

export default {
  emits: [
    'pinStateChange'
  ],
  methods: {
    /**
     * @description will toggle the footer bar pin state
     */
    togglePinState(): void {
      let toggleStateString = LocalStorageService.get(DevelopmentLocalStorageService.IS_DEVELOPER_FOOTER_BAR_PINNED);
      let isPinned          = ("1" === toggleStateString);
      let newState          = !isPinned;
      let newStateString    = !newState ? "0" : "1";

      LocalStorageService.set(DevelopmentLocalStorageService.IS_DEVELOPER_FOOTER_BAR_PINNED, newStateString);
      this.$emit('pinStateChange');
    }
  }
}
</script>