<script lang="ts">
import TranslationsProvider from "@/scripts/Vue/Provider/TranslationsProvider";
import BaseApiResponse      from "@/scripts/Response/BaseApiResponse";
import EnvReader            from "@/scripts/Core/System/EnvReader";

export default {
  name: "FailedBackendResponseHandler",
  methods: {
    /**
     * @description will handle failed backend response
     *
     * Returned TRUE means that the response was success, failed otherwise
     */
    handleFailedBackendResponse(response: BaseApiResponse, calledUri: string): boolean {
      if (!response.success) {

        /**
         * @description here was Logger.error before, but it's the same case as with enums below. It cannot be used
         *              , not even conditionally. It's enough to have the import statement for it to fail.
         *              Thus adding the normal dev based console logging.
         */
        if (EnvReader.isDev()) {
          console.error({
            info: "Got error response from backend",
            response: response,
            calledUri: calledUri,
          })
        }

        let shownMessage = TranslationsProvider.FALLBACK_SAFETY_MESSAGE;
        if (response.isMessageSet()) {
          shownMessage = response.message;
        }

        /**
         * @description DO NOT use the enums in here, there is something wrong with Vue and it crashes on hot-update
         *              if the enum gets used.
         */
        this.$rootEvent.showNotification('error', shownMessage);
        return false;
      }

      return true
    }
  }
}
</script>