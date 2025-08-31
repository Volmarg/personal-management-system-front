<template>
  <MediumButtonWithIcon @click.prevent="isModalVisible = true"
                        margin-right-class-number="2"
                        v-tippy="{
                          content: $t('payments.monthly.tabs.import.step.processData.button.view.popupMessage')
                        }"
  >
    <template #icon>
      <fa
          :icon="['far', 'eye']"
          :is-margin-right="false"
          class="preview-icon"
      />
    </template>
  </MediumButtonWithIcon>

  <teleport to="body">
    <Modal :is-visible="isModalVisible"
           id="preview-import-data"
           :title="$t('payments.monthly.tabs.import.step.processData.originalDataModal.header')"
           :is-confirm-visible="false"
           @modal-closed="isModalVisible = false"
    >
      <template #content>
        <pre class="data-holder text-2md">{{ spreadsheetRowData }}</pre>
      </template>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Modal                from "@/components/Modal/Modal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isModalVisible: false,
    }
  },
  props: {
    spreadsheetRowData: {
      type: Object,
      required: true,
    }
  },
  components: {
    Modal,
    MediumButtonWithIcon
  }
}
</script>

<style lang="scss">
.data-holder {
  background: none !important;
}

.preview-icon {
  scale: 1.5
}
</style>