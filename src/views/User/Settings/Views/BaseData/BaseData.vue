<template>
  <div>

    <Accordion class="mb-4">
      <AccordionPanel
          class="accordion-panel"
          :initially-open="!isMobileBrowser"
          :initial-open-delay-ms="700"
      >
        <template #title>
          <span class="underline">
            {{ $t('views.user.baseData.importantInformation.accordion.header') }}
          </span>
        </template>
        <template #content>

          <DescriptionBlock class="mb-4 mt-4 text-left">
            <span v-html="$t('views.user.baseData.information.updateWontAffect')"></span>
          </DescriptionBlock>
          <DataUsageInfo />

        </template>
      </AccordionPanel>
    </Accordion>

    <!-- buttons grid -->

    <!-- personal data -->
    <Row :is-content-equally-distributed="true"
         :flex-direction="rowFlexDirection"
    >
      <MediumButtonWithIcon :text="$t('views.user.baseData.nav.personalData')"
                            :is-icon-on-top="true"
                            @click="isEditPersonalDataDialogVisible = true"
                            button-classes="user-settings-view-button"
      >
        <template #icon>
          <IconSvgPerson/>
        </template>
      </MediumButtonWithIcon>

      <!-- profile image -->
      <MediumButtonWithIcon :text="$t('views.user.baseData.nav.profileImage')"
                            :is-icon-on-top="true"
                            @click="isProfileImageModalVisible = true"
                            button-classes="user-settings-view-button"
      >
        <template #icon>
          <la color="white"
              svg-icon-name="camera-retro-solid"
              font-size="20"/>
        </template>
      </MediumButtonWithIcon>

      <!-- email address -->
      <MediumButtonWithIcon :text="$t('views.user.baseData.nav.emailAddress')"
                            :is-icon-on-top="true"
                            @click="isEmailAddressDialogVisible = true"
                            button-classes="user-settings-view-button"
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
import AccordionPanel       from "@/components/Ui/Accordion/Panel.vue";
import Accordion            from "@/components/Ui/Accordion/Accordion.vue";
import DataUsageInfo        from "@/views/User/PersonalData/DataUsageInfo.vue";
import DescriptionBlock     from "@/components/Page/InformationBlock.vue";
import IconSvgPerson        from "@/components/Ui/Icons/Svg/Person.vue";
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
    Accordion,
    AccordionPanel,
    EmailAddressDialog,
    ProfileImageUpload,
    EditPersonalDataDialog,
    MediumButtonWithIcon,
    DescriptionBlock,
    IconSvgPerson,
    "la": LineAwesome,
    Row,
    DataUsageInfo
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