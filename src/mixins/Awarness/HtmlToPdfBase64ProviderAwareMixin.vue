<script lang="ts">
import SymfonyRoutes       from "@/router/SymfonyRoutes";
import SymfonySystemRoutes from "@/router/SymfonyRoutes/SymfonySystemRoutes";
import BaseApiResponse     from "@/scripts/Response/BaseApiResponse";
import {ComponentData}     from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      // these are enums on backend
      source: {
        template: 'emailTemplate',
      }
    }
  },
  methods: {
    /**
     * @description returns base64 of pdf created from html content, the pdf is split
     *              into multiple pages if needed (automatically),
     *
     *              The result is normal pdf with select-able text etc.
     */
    getMultiPagePdfBas64(htmlContent: string, source: string|null): Promise<string> {
      let data = {
        htmlContent: htmlContent,
      };

      if (source) {
        data['source'] = source;
      }

      let url = SymfonyRoutes.buildUrl(SymfonySystemRoutes.HTML_TO_PDF_PAGES);

      this.$rootEvent.showFullPageLoader();
      return this.$axios.postWithCsrf(url, data).then((response: BaseApiResponse) => {
        this.$rootEvent.hideFullPageLoader();
        return response.base64;
      })
    },
    /**
     * @description returns base64 of pdf created from html content, the result pdf is one big constant pdf without
     *              splitting into multiple pages (results in lesser quality)
     *
     *              The way it works is:
     *              - html -> img,
     *              - img -> pdf,
     *
     *              So nothing on the pdf is interactive
     */
    getSinglePdfBase64(htmlContent: string, source: string|null): Promise<string> {
      let data = {
        htmlContent: htmlContent
      };

      if (source) {
        data['source'] = source;
      }

      let url = SymfonyRoutes.buildUrl(SymfonySystemRoutes.HTML_TO_SINGLE_PDF);

      this.$rootEvent.showFullPageLoader();
      return this.$axios.postWithCsrf(url, data).then((response : BaseApiResponse) => {
        this.$rootEvent.hideFullPageLoader();
        return response.base64;
      })
    }
  }
}
</script>