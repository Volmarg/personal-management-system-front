<template>
  <div>
    <MediumButtonWithIcon :text="$t('userSettings.tab.security.children.changePassword.label')"
                          :is-icon-on-top="true"
                          @click="showDialog"
                          button-classes="user-settings-view-button"
    >
      <template #icon>
        <la color="white"
            svg-icon-name="key-solid"
            font-size="20"/>
      </template>
    </MediumButtonWithIcon>

    <ChangePasswordModal :is-visible="isModalVisible"
                         @modal-closed="onModalClosed"
    />

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import LineAwesome          from "@/components/Ui/Icons/LineAwesome.vue";
import ChangePasswordModal from "@/views/User/Settings/Views/Security/components/ChangePassword/Modal.vue";
import {ComponentData}     from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isModalVisible: false,
    }
  },
  components: {
    ChangePasswordModal,
    MediumButtonWithIcon,
    "la": LineAwesome
  },
  methods: {
    /**
     * @description will show the dialog
     */
    showDialog(): void {
      this.isModalVisible = true;
    },
    /**
     * @description handler for when the modal is closed:
     *             - marks the dialog as not active
     */
    onModalClosed(): void {
      this.isModalVisible = false;
    }
  }
}
</script>