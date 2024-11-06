<template>

  <div v-if="contacts.length > 0">
    <div class="flex flex-wrap mt-10 justify-center">
      <SingleContactComponent v-for="contact in contacts"
                              :key="JSON.stringify(contact)"
                              :contact="contact"
                              @click="$emit('contactEditClick', {contact: contact})"
      />
    </div>

    <hr class="mt-10"/>
  </div>

  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col md:w-1/2 lg:w-1/3">
      <CreateEditContactForm
          :header="$t('issues.pending.modal.viewEdit.tabs.contacts.form.header.new')"
          :issue-id="issueId"
          @submit="$emit('closeModal')"
      />
    </div>
  </div>

</template>

<script lang="ts">
import {SingleContact} from "@/scripts/Core/Types/Modules/Issues";

import SingleContactComponent from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabContacts/SingleContact.vue";
import CreateEditContactForm  from "@/views/Modules/Issues/Components/CreateEditContactForm.vue";

export default {
  props: {
    contacts: {
      type: Array as Array<SingleContact>,
      required: true,
    },
    issueId: {
      type: Number,
      required: true,
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  components: {
    CreateEditContactForm,
    SingleContactComponent,
  },
  emits: [
    'closeModal',
    'contactEditClick'
  ],
}
</script>