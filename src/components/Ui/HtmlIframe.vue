<template>
  <iframe ref="iframe"
          class="w-full html-iframe"
  />
</template>

<script lang="ts">
import BaseError from "@/scripts/Core/Error/BaseError";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

export default {
  name: "HtmlIframe",
  props: {
    html: {
      type     : String,
      required : true,
    }
  },
  methods: {
    setIframeContent() {
      /**
       * @description didn't managed to find out why, but this is executed twice and in one case
       *              the `$refs` are empty.
       */
      if (undefined !== this.$refs.iframe) {

        let frameDoc = this.$refs.iframe.document;
        if (undefined === frameDoc) {
          frameDoc = this.$refs.iframe.contentWindow.document;
        }

        if (undefined === frameDoc) {
          this.$rootEvent.showNotification(ToastTypeEnum.error, this.$t('messages.incompatibleBrowser'));
          throw new BaseError("Could not insert the Iframe content, maybe browser is to old?", {
            userAgent: navigator?.userAgent,
          })
        }

        frameDoc.open();
        frameDoc.writeln(this.html);
        frameDoc.close();
      }
    }
  },
  mounted() {
    this.setIframeContent();
  },
  updated() {
    this.setIframeContent();
  }
}
</script>

<style lang="scss" scoped>
.html-iframe {
  min-height: inherit;
}
</style>