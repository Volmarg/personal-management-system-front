<template>
  <div>
    <MediumButtonWithIcon :text="$t('views.settings.buttons.removeAccount')"
                          :is-icon-on-top="true"
                          @click="showConfirmAccountRemovalDialog()"
                          button-classes="user-settings-view-button"
    >
      <template #icon>
        <la color="white"
            svg-icon-name="trash-alt"
            font-size="20"/>
      </template>
    </MediumButtonWithIcon>

    <RemoveAccountModal :is-visible="isModalVisible"
                        @modal-closed="onRemovalModalClosed"
    />

  </div>
</template>

<script lang="ts">

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import RemoveAccountModal   from "@/views/User/Settings/Views/Account/components/RemoveAccount/Modal.vue";
import {ComponentData}      from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isModalVisible : false,
    }
  },
  components: {
    MediumButtonWithIcon,
    RemoveAccountModal,
  },
  methods: {
    /**
     * @description will show account removal confirmation dialog
     */
    showConfirmAccountRemovalDialog(): void {
      this.isModalVisible = true;
    },
    /**
     * @description handler for when account removal modal gets closed
     */
    onRemovalModalClosed(): void {
      this.isModalVisible = false
    }
  }
}
</script>