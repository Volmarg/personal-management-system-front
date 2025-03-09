<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('issues.pending.modal.viewEdit.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>

        <Tabs :tabs-with-content="tabsContent"
              id="issueViewEditModal"
              @close-modal="$emit('modalClosed')"
              @contact-edit-click="$emit('contactEditClick', $event)"
              @progress-edit-click="$emit('progressEditClick', $event)"
        />

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                        from "@/components/Modal/Modal.vue";
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData}                 from "@/scripts/Vue/Types/Components/types";
import {SingleContact, SingleProgress} from "@/scripts/Core/Types/Modules/Issues";

import Tabs        from "@/components/Navigation/Tabs/Tabs.vue";
import TabEdit     from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabEdit.vue";
import TabContacts from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabContacts.vue";
import TabProgress from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabProgress.vue";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "medium",
      showModal: false,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contacts: {
      type: Array as Array<SingleContact>,
      required: true,
    },
    allProgress: {
      type: Array as Array<SingleProgress>,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showOnDashboard: {
      type: Boolean,
      required: false,
      default: false,
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    Tabs,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "contactEditClick",
    "progressEditClick",
  ],
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('issues.pending.modal.viewEdit.tabs.edit.label'),
          tabComponent: TabEdit,
          tabComponentProps: {
            id: this.id,
            name: this.name,
            description: this.description,
            showOnDashboard: this.showOnDashboard,
          }
        },
        {
          tabName: this.$t('issues.pending.modal.viewEdit.tabs.contacts.label'),
          tabComponent: TabContacts,
          tabComponentProps: {
            issueId: this.id,
            contacts: this.contacts,
          }
        },
        {
          tabName: this.$t('issues.pending.modal.viewEdit.tabs.progress.label'),
          tabComponent: TabProgress,
          tabComponentProps: {
            issueId: this.id,
            allProgress: this.allProgress,
          }
        }
      ];
    }
  },
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>