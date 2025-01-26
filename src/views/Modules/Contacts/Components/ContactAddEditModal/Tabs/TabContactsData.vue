<template>
  <div class="flex-wrap flex justify-around">
    <TypeSingleCard v-for="contactType in contactData?.types ?? []"
                    :key="contactType.uuid"
                    :contact-type="contactType"
                    @click="$emit('editClick', {typeData: contactType})"
    />
  </div>

  <div>
    <AddEditForm :header="$t('contacts.list.modal.addEdit.typeForm.header.add')"
                 :contact-id="contactData?.id"
                 @submit="$emit('confirmClick')"
    />
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {TypeStore}     from "@/scripts/Vue/Store/Module/Contacts/TypeStore";

import AddEditForm    from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData/TypeAddEditForm.vue";
import TypeSingleCard from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData/TypeSingleCard.vue";

export default {
  data(): ComponentData {
    return {
      allTypes: [],
    }
  },
  props: {
    contactData: {
      type: Array,
      required: true,
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  components: {
    TypeSingleCard,
    AddEditForm,
  },
  emits: [
    'editClick',
    'confirmClick'
  ],
  async beforeMount(): Promise<void> {
    let store = TypeStore();
    await store.getAll();
    this.allTypes = store.allEntries;
  }
}
</script>