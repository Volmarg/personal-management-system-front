<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('contacts.list.modal.typeEdit.header')"
           :cancel-text="$t('contacts.list.modal.addEdit.button.close.label')"
           :size="modalSize"
           @modal-closed="onModalClosed"
    >
      <template #content>
        <TypeAddEditForm :contact-id="contactId"
                         :type-name="data?.name ?? null"
                         :value="data?.details ?? null"
                         :uuid="data?.uuid ?? null"
                         @submit="$emit('confirmClick'); $emit('modalClosed')"
        />
      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon :text="$t('contacts.list.modal.typeEdit.button.remove.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full md:w-auto"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              background-color-class="bg-red-500"
                              @button-click="$emit('removeClick')"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import ResponsiveModalSizeMixin     from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TypeAddEditForm      from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData/TypeAddEditForm.vue";
import Modal                from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "medium",
      showModal: false,
      contactData: {},
    }
  },
  props: {
    contactId: {
      type: Number,
      required: true,
    },
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
    MediumButtonWithIcon,
    TypeAddEditForm,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "removeClick",
    "confirmClick",
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