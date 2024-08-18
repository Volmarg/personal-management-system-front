<template>
  <BaseButton class="bg-black eruda"
              @click="init"
              v-tippy="{
                content: 'Eruda - dev tool'
              }"
  >
    <la
        svg-icon-name="cog-solid"
        color="white"
        font-size="30"
    />

  </BaseButton>
</template>

<script lang="ts">
import * as eruda from "eruda";

import BaseButton from "@/components/Development/FooterBar/Buttons/BaseButton.vue";

import EnvReader from "@/scripts/Core/System/EnvReader";

export default {
  mixins: [
  ],
  components: {
    BaseButton
  },
  methods: {
    /**
     * @description init eruda and make it usable - it's known that on page reload it has to be initialised again and that's planned
     *              this will spawn small tooltip panel which then allows opening dev tool
     */
    init(): void {
      if (EnvReader.isDev()) {
        //@ts-ignore - because resolving via vite into mock file without that function for PROD
        eruda.init({
          container: document.getElementById('erudaWrapper')
        });
      }
    },
  }
}
</script>