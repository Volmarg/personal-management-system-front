<template>
  <UploadDialog :is-visible="isVisible"
                :configuration-id="configurationId"
                @upload-finished="onUploadFinished"
  />
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

import UploadDialog from "@/components/Ui/Upload/Dialog/UploadDialog.vue";
import SymfonyRoutes from "@/router/SymfonyRoutes";
import SymfonyUserSettingRoutes from "@/router/SymfonyRoutes/User/Setting/SymfonyUserSettingRoutes";
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      configurationId: 'ef61b8bf828699f522861815c9ac8969',
    }
  },
  props: {
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  emits: [
    'profileImageChanged'
  ],
  components: {
    UploadDialog,
  },
  methods: {
    /**
     * @description handler for after upload finish, see route description for more information
     */
    onUploadFinished(data: Record<string, number | string>): void {
      if (!data.isSuccess) {

        if (!StringTypeProcessor.isEmptyString(data.message)) {
          this.$rootEvent.showNotification(ToastTypeEnum.warning, data.message);
        }

        return;
      }

      let calledUrl = SymfonyRoutes.buildUrl(SymfonyUserSettingRoutes.URL_CHANGE_PROFILE_IMAGE);

      this.$rootEvent.showFullPageLoader();
      this.$axios.get(calledUrl).then( (response: BaseApiResponse) => {

        this.$emit('profileImageChanged');
        this.$rootEvent.hideFullPageLoader();
        if (response.isMessageSet()) {
          let notificationType = (response.success ? ToastTypeEnum.success : ToastTypeEnum.warning);
          this.$rootEvent.showNotification(notificationType, response.message);
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
// fix issue with whole row click causing save
.submit-button {
  max-width: 110px;
}
</style>