<template>
  <Base :info-block-description="$t('contacts.description')"
        :is-in-container="false"
  >
    <div v-if="contactsData.length > 0"
         class="flex flex-wrap"
    >
      <SingleCard v-for="contactData in contactsData"
                  :key="JSON.stringify(contactData)"
                  @edit-click="isEditModalVisible = true"
                  @remove-click="isRemoveModalVisible = true"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>
  </Base>

  <EditModal :is-modal-visible="isEditModalVisible"
             @modal-closed="isEditModalVisible = false"
             @confirm-click="onEditConfirmClick"
  />

  <AddNewModal :is-modal-visible="isAddNewModalVisible"
               @modal-closed="isAddNewModalVisible = false"
               @add-new-click="onAddNewClick"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               @modal-closed="isRemoveModalVisible = false"
               @remove-confirm-click="onRemoveClickConfirm"
  />

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddNewModalVisible = true"
                       v-tippy="$t('contacts.button.addNew.hoverText')"
  />
</template>

<script lang="ts">
import Base                from "@/views/Modules/Base.vue";
import SingleCard          from "@/views/Modules/Contacts/Components/SingleCard.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import EditModal   from "@/views/Modules/Contacts/Components/EditModal.vue";
import AddNewModal from "@/views/Modules/Contacts/Components/AddNewModal.vue";
import RemoveModal from "@/views/Modules/Contacts/Components/RemoveModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      isEditModalVisible: false,
      isRemoveModalVisible: false,
      contactsData: [
        {}, {}, {}, {}, {}, {}
      ]
    }
  },
  components: {
    Base,
    SingleCard,
    NoResultsText,
    FloatingRoundedPlus,
    EditModal,
    AddNewModal,
    RemoveModal,
  },
  methods: {
    /**
     * @description handles user clicking on edit and confirming, updates backend && frontend
     */
    onEditConfirmClick(): void {
      //
    },
    /**
     * @description handles user clicking on add-new and confirming, updates backend && frontend
     */
    onAddNewClick(): void {
      //
    },
    /**
     * @description handles user clicking on remove and confirming, updates backend && frontend
     */
    onRemoveClickConfirm(): void {
      //
    },
  }
}
</script>