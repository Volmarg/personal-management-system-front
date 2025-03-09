<template>
  <div @click="copyToClipboard"
       v-tippy="{
          content: $t('components.actions.copy.label'),
          placement: 'top'
       }"
  >
    <slot name="representation"></slot>
  </div>
</template>

<script lang="ts">
import ActionMixin from "@/components/Ui/Actions/Mixin/ActionMixin.vue";

import BaseError           from "@/scripts/Core/Error/BaseError";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import ClipboardService    from "@/scripts/Core/Services/ClipboardService";

export default {
  props: {
    copiedDataKey: {
      type: String,
      required: true,
    },
    handledData: {
      type: Object,
      required: true,
    }
  },
  mixins: [
    ActionMixin,
  ],
  methods: {
    /**
     * @description copies data to clipboard
     */
    async copyToClipboard(): Promise<void> {
      if (StringTypeProcessor.isEmptyString(this.copiedDataKey)) {
        throw new BaseError("Copied data key is empty! Did You forget to pass it via prop?")
      }

      ClipboardService.copyToClipboard(this.handledData[this.copiedDataKey]);
    }
  }
}
</script>