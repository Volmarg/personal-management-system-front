<script lang="ts">
import BaseApiResponse      from "@/scripts/Response/BaseApiResponse";
import EnvReader            from "@/scripts/Core/System/EnvReader";
import TranslationsProvider from "@/scripts/Vue/Provider/TranslationsProvider";
import ToastNotification    from "@/scripts/Libs/ToastNotification";

export default {
  methods: {
    /**
     * @description provides some very basic response handling:
     *              - shows message,
     *              - logs error if on dev (for debugging),
     *
     * @returns {boolean} true if response is successful, false otherwise
     */
    handleResponse(response: BaseApiResponse, calledUri: string): boolean {

      let type = ToastNotification.getTypeFromCode(response.code);
      let msg = response.message;
      if (!response.success) {
        msg = (response.message ? response.message : TranslationsProvider.FALLBACK_SAFETY_MESSAGE);

        /**
         * @description Logger cannot be used here, for some reason it breaks the code execution (even its import)
         */
        if (EnvReader.isDev()) {
          console.error({
            info: "Got error response from backend",
            response: response,
            calledUri: calledUri,
          })
        }

      }

      if (msg) {
        ToastNotification.showAlert(type, msg);
      }

      return response.success;
    }
  }
}
</script>