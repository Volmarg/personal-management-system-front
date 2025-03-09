<template>
  <div>
    <Modal :is-visible="showModal"
           :title="header"
           :cancel-text="$t('contacts.list.modal.addEdit.button.close.label')"
           :size="modalSize"
           @modal-closed="onModalClosed"
    >
      <template #content>

        <WarningBlock v-if="!data || !data.id">
          <span v-html="$t('contacts.list.modal.addEdit.description.add')"
                class="text-center"
          />
        </WarningBlock>

        <!-- the submit / click are only for type contact, main info is handled inside the main tab independently -->
        <Tabs :tabs-with-content="tabsContent"
              id="contactAddEditModal"
              @close-modal="$emit('modalClosed')"
              @confirm-click="$emit('contactTypeFormSubmit')"
              @edit-click="$emit('singleContactTypeClick', $event)"
        />

      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import WarningBlock       from "@/components/Page/WarningBlock.vue";
import Modal              from "@/components/Modal/Modal.vue";
import Tabs               from "@/components/Navigation/Tabs/Tabs.vue";
import TabMainInformation from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabMainInformation.vue";
import TabContactsData    from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData.vue";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "medium",
      showModal: false,
      contactData: {},
    }
  },
  props: {
    data: {
      type: [Object, null],
      required: false,
      default: null
    },
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    WarningBlock,
    Tabs,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "singleContactTypeClick",
    "contactTypeFormSubmit",
  ],
  computed: {
    /**
     * @description returns the modal header (edit/add mode)
     */
    header(): string {
      if (!this.data) {
        return this.$t('contacts.list.modal.addEdit.header.add');
      }

      return this.$t('contacts.list.modal.addEdit.header.edit');
    },
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('contacts.tabs.mainInfo.label'),
          tabComponent: TabMainInformation,
          tabComponentProps: {
            contactData: this.contactData,
          }
        },
        {
          tabName: this.$t('contacts.tabs.contactType.label'),
          tabComponent: TabContactsData,
          tabComponentProps: {
            contactData: this.contactData,
          }
        },
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
  },
  watch: {
    data(): void {
      this.contactData = this.data;
    }
  }
}
</script>