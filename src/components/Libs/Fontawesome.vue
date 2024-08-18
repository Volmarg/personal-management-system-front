<template>
  <span>

    <fa :icon="icon"
        :class="{
          'mr-2': isMarginRight
        }"
    />

  </span>
</template>

<script lang="ts">
import Fontawesome from "@/scripts/Vue/Plugin/Libs/Fontawesome";

/**
 * @description this class is a wrapper of the fontawesome component, as in some cases it requires
 *              to add some extra props like spacing etc
 */
export default {
  name: "FontawesomeComponent",
  props: {
    icon: {
      required : true,
    },
    isMarginRight: {
      type     : Boolean,
      required : false,
      default  : true,
    }
  },
  components: {
    "fa": Fontawesome.getConfiguredComponent()
  }
}
</script>