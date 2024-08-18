<template>
  <div class="border border-2 border-gray-300 footer-bar p-2 footer-bar bottom-0 w-full bg-white grid grid-cols-12 rounded-md"
       :class="{
          'not-pinned': !isFullBarVisible,
          'fixed': isFullBarVisible,
       }"
       v-if="isDevSystem()"
       ref="footerBarWrapper"
  >
    <div
        class="col-start-1 col-end-6 grid grid-cols-12"
        v-if="isFullBarVisible"
    >
      <SymfonyProfiler class="col-start-1 col-end-1"
      />

      <Eruda class="col-start-8 col-end-8 sm:col-start-3 sm:col-end-3 xl:col-start-2 xl:col-end-2" />
    </div>

    <PinBar class="col-start-13 col-end-13"
            @pin-state-change="onPinStateChange"
    />
  </div>
</template>

<script lang="ts">

import PinBar          from "@/components/Development/FooterBar/Buttons/PinBar.vue";
import SymfonyProfiler from "@/components/Development/FooterBar/Buttons/SymfonyProfiler.vue";
import Eruda           from "@/components/Development/FooterBar/Buttons/Eruda.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import DevelopmentLocalStorageService from "@/scripts/Core/Services/Storage/DevelopmentLocalStorageService";
import EnvReader from "@/scripts/Core/System/EnvReader";

export default {
  data(): ComponentData {
    return {
      isFullBarVisible: false,
    }
  },
  components: {
    PinBar,
    Eruda,
    SymfonyProfiler,
  },
  methods: {
    /**
     * @description check if current system is dev system.
     *              This cannot relly on role the same way as dev sidebar,
     *              because dev sidebar is visible only for logged-in user,
     */
    isDevSystem(): boolean {
      return EnvReader.isDev();
    },
    /**
     * @description handles the bar pin state change
     */
    onPinStateChange(): void {
      this.isFullBarVisible = DevelopmentLocalStorageService.isDeveloperFooterBarPinned();
    },
  },
  created(): void {
    this.isFullBarVisible = DevelopmentLocalStorageService.isDeveloperFooterBarPinned();
  },

}
</script>

<style lang="scss" scoped>
.footer-bar {
  height: 55px;
  z-index: 99;
}

.not-pinned {
  width: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>

<style lang="scss">
.footer-bar {
  .line-awesome-icon-wrapper svg {
    height: 100%;
  }
}

</style>