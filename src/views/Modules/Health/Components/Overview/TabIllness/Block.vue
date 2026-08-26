<template>
    <MediumDataBlock :title="illness.name"
                     :description="illness.information"
                     :desc-max-chars="150"
                     @on-hamburger-click="isMenuOpen=!isMenuOpen"
    >
      <template #menu>
        <Menu :is-menu-open="isMenuOpen"
              :config="menuConfiguration"
              @view-edit-click="isViewEditModalVisible = true; isMenuOpen = false;"
              @removed-click="isRemoveModalVisible = true; isMenuOpen = false;"
        />
      </template>

      <template #mainContent>
        <BlockMainContent :illness="illness" />
      </template>

    </MediumDataBlock>

    <teleport to="body">
      <ViewEditModal :is-modal-visible="isViewEditModalVisible"
                     :illness="illness"
                     @modal-closed="this.isViewEditModalVisible = false"
                     @files-saved="$emit('filesSaved')"
                     class="relative z-21"
      />
    </teleport>

    <teleport to="body">
      <RemoveModal :is-modal-visible="isRemoveModalVisible"
                   :illness="illness"
                   @modal-closed="this.isRemoveModalVisible = false"
                   class="relative z-21"
      />
    </teleport>
</template>

<script lang="ts">
import MediumDataBlock  from "@/components/Ui/Containers/MediumDataBlock.vue";
import Menu             from "@/components/Ui/Containers/Components/MediumDataBlock/Menu.vue";
import BlockMainContent from "@/views/Modules/Health/Components/Overview/TabIllness/BlockMainContent.vue";
import ViewEditModal    from "@/views/Modules/Health/Components/Overview/TabIllness/ViewEditModal.vue";
import RemoveModal      from "@/views/Modules/Health/Components/Overview/TabIllness/RemoveModal.vue";

import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import {MenuConfiguration} from "@/scripts/Core/Types/Components/UI/MediumDataBlock";

export default {
  data(): ComponentData {
    return {
      isViewEditModalVisible: false,
      isRemoveModalVisible: false,
      isMenuOpen: false,
      menuConfiguration: [
        {
          label: this.$t('health.overview.dataBox.menu.viewEdit.label'),
          eventName: "viewEditClick"
        },
        {
          label: this.$t('health.overview.dataBox.menu.delete.label'),
          eventName: "removedClick",
          cssClasses: "text-red-600"
        }
      ] as MenuConfiguration,
    }
  },
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    ViewEditModal,
    RemoveModal,
    BlockMainContent,
    Menu,
    MediumDataBlock
  },
  emits: [
    'filesSaved'
  ],
}
</script>