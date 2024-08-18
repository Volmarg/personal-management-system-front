<template>
  <a :href="absoluteProfilerUrl"
     target="_blank"
  >
    <BaseButton class="bg-black"
                v-tippy="{
                  content: 'Symfony profiler'
                }"
    >
      <la svg-icon-name="symfony"
          color="white"
          font-size="30"
      />
    </BaseButton>
  </a>
</template>

<script lang="ts">

import BaseButton from "@/components/Development/FooterBar/Buttons/BaseButton.vue";

import SymfonyProfilerAwareMixin from "@/mixins/Awarness/SymfonyProfilerAwareMixin.vue";

export default {
  mixins: [
    SymfonyProfilerAwareMixin,
  ],
  components: {
    BaseButton
  }
}
</script>