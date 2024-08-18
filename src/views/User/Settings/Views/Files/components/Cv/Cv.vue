<template>
  <div>

    <MediumButtonWithIcon :text="$t('views.user.settings.files.cv.label')"
                          :is-icon-on-top="true"
                          @click="isModalVisible = true"
                          button-classes="user-settings-view-button"
    >
      <template #icon>
        <la svg-icon-name="file-pdf"
            color="white"
        />
      </template>
    </MediumButtonWithIcon>

    <CvModal :is-visible="isModalVisible"
             @modal-closed="isModalVisible = false"
    />


  </div>
</template>

<script lang="ts">

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import CvModal              from "@/views/User/Settings/Views/Files/components/Cv/components/CvModal.vue";
import {ComponentData}      from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isModalVisible: false,
    }
  },
  components: {
    MediumButtonWithIcon,
    CvModal
  }
}
</script>