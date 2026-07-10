<template>
  <OnClickSmallMenu :is-menu-open="isMenuOpen">
    <Element v-for="configChunk in config"
             :key="JSON.stringify(configChunk)"
    >
      <a :class="configChunk.cssClasses"
         @click.prevent="$emit(configChunk.eventName)"
         v-html="configChunk.label"
      />
    </Element>
  </OnClickSmallMenu>
</template>

<script lang="ts">
import OnClickSmallMenu from "@/components/Ui/Navigation/OnClickSmallMenu.vue";
import Element          from "@/components/Ui/Navigation/OnClickSmallMenu/Element.vue";

import {MenuConfiguration} from "@/scripts/Core/Types/Components/UI/MediumDataBlock";

export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    },
    config: {
      type: null as Array<MenuConfiguration>,
      required: true,
    }
  },
  emits:[
    'menuClose'
  ],
  components: {
    Element,
    OnClickSmallMenu
  },
}
</script>
