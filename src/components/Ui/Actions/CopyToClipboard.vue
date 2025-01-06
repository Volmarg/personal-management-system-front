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

import {ToastTypeEnum}     from "@/scripts/Libs/ToastNotification";
import BaseError           from "@/scripts/Core/Error/BaseError";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

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
     * @description copies to clipboard. Using solution with insert / copy from DOM, because navigator requires
     *              the page to run on SSL.
     */
    async copyToClipboard(): Promise<void> {
      let textarea: HTMLTextAreaElement | undefined = document.getElementById('clipboardDataHolder');
      if (!textarea) {
        throw new BaseError("#clipboardDataHolder does not exist!");
      }

      if (StringTypeProcessor.isEmptyString(this.copiedDataKey)) {
        throw new BaseError("Copied data key is empty! Did You forget to pass it via prop?")
      }

      this.copyFromTextArea(this.handledData[this.copiedDataKey], textarea);
      textarea.textContent = '';

      let msg = this.$t('generic.text.copiedToClipboard');
      this.$rootEvent.showNotification(ToastTypeEnum.info, msg);
    },
    /**
     * @description copies the provided content into the textarea and then into clipboard.
     *
     *              Element must be visible for copy to work, thus making it visible for a tiny moment before copy is executed,
     *              and then hiding it back.
     *
     *              Already tried using this solution for cleaning up the clipboard after X seconds, but it didn't work
     *              when I was doing something in the dev-console, so I assume the same is valid when user is away from page.
     */
    copyFromTextArea(content: string, textarea: HTMLTextAreaElement): void {
      textarea.textContent = content;
      textarea.classList.remove('hidden');
      textarea.select();
      document.execCommand("copy");
      textarea.classList.add('hidden');
    },
  }
}
</script>