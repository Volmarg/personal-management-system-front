<template>
  <div>

    <!-- personal data -->
    <Row :is-content-equally-distributed="true"
         :flex-direction="rowFlexDirection"
    >
      <MediumButtonWithIcon :text="$t('userSettings.tab.baseData.children.personalData.label')"
                            :is-icon-on-top="true"
                            @click="isEditPersonalDataDialogVisible = true"
                            button-classes="settings-view-button"
      >
        <template #icon>
          <fa icon="user" />
        </template>
      </MediumButtonWithIcon>

      <!-- profile image -->
      <MediumButtonWithIcon :text="$t('userSettings.tab.baseData.children.profileImage.label')"
                            :is-icon-on-top="true"
                            @click="isProfileImageModalVisible = true"
                            button-classes="settings-view-button"
      >
        <template #icon>
          <la color="white"
              svg-icon-name="camera-retro-solid"
              font-size="20"/>
        </template>
      </MediumButtonWithIcon>

      <!-- email address -->
      <MediumButtonWithIcon :text="$t('userSettings.tab.baseData.children.emailAddress.label')"
                            :is-icon-on-top="true"
                            @click="isEmailAddressDialogVisible = true"
                            button-classes="settings-view-button"
      >
        <template #icon>
          <la color="white"
              svg-icon-name="envelope-open"
              font-size="20"/>
        </template>
      </MediumButtonWithIcon>
    </Row>

    <!-- dialogs -->
    <EditPersonalDataDialog :is-visible="isEditPersonalDataDialogVisible"
                            @modal-closed="isEditPersonalDataDialogVisible = false"
    />


    <EmailAddressDialog :is-visible="isEmailAddressDialogVisible"
                        @modal-closed="isEmailAddressDialogVisible = false"
    />

    <ProfileImageUpload :is-visible="isProfileImageModalVisible"
                        @modal-closed="isProfileImageModalVisible = false"
                        @profile-image-changed="$emit('profileImageChanged')"
    />

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";
import {ComponentData}      from "@/scripts/Vue/Types/Components/types";

import Row                    from "@/components/Ui/Row.vue";
import EmailAddressDialog     from "@/views/User/Settings/Views/BaseData/components/EmailAddress/Dialog.vue";
import ProfileImageUpload     from "@/views/User/Settings/Views/BaseData/components/ProfileImageUpload/Dialog.vue";
import EditPersonalDataDialog from "@/views/User/Settings/Views/BaseData/components/PersonalData/Dialog.vue";

import ResponsiveViewNavMixin from "@/views/User/Settings/Views/Mixin/ResponsiveViewNavMixin.vue";

import BrowserDetection from "@/scripts/Core/Services/View/BrowserDetection";

export default {
  data(): ComponentData {
    return {
      isMobileBrowser: BrowserDetection.isMobileBrowser(),
      isDetailModalVisible: false,
      isProfileImageModalVisible: false,
      isEmailAddressDialogVisible: false,
      isEditPersonalDataDialogVisible: false,
    }
  },
  components: {
    EmailAddressDialog,
    ProfileImageUpload,
    EditPersonalDataDialog,
    MediumButtonWithIcon,
    "la": LineAwesome,
    Row,
  },
  mixins: [
    ResponsiveViewNavMixin
  ],
  emits: [
    'profileImageChanged'
  ],
  methods: {
    /**
     * @description will show the user details dialog
     */
    showDetailsModal(): void {
      this.isDetailModalVisible = true;
    },
    /**
     * @description will hide the user details dialog
     */
    hideDetailsModal(): void {
      this.isDetailModalVisible = false;
    }
  }
}
</script>