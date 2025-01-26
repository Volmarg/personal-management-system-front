<template>
  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ header }}</h2>

      <FormInput type="text"
                 v-model="form.name"
                 :label="$t('contacts.list.modal.addEdit.contactForm.name.label')"
      />

      <FormInput type="text"
                 v-model="form.imagePath"
                 :label="$t('contacts.list.modal.addEdit.contactForm.imagePath.label')"
      />

      <FormInput type="text"
                 v-model="form.description"
                 :label="$t('contacts.list.modal.addEdit.contactForm.description.label')"
      />

      <GroupSelect v-model="form.groupId"
                   :groups-data="groupsData"
                   class="mb-6"
      />

      <MediumButtonWithIcon :text="$t('contacts.list.modal.addEdit.contactForm.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />

    </div>
  </div>

</template>

<script lang="ts">

import GroupSelect          from "@/views/Modules/Contacts/Components/GroupSelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {GroupStore}      from "@/scripts/Vue/Store/Module/Contacts/GroupStore";
import {ContactsStore}   from "@/scripts/Vue/Store/Module/Contacts/ContactsStore";
import {StoreDefinition} from "pinia";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyContactsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      contactsStore: null as null | StoreDefinition,
      form: {
        name: null,
        description: null,
        imagePath: null,
        groupId: null,
      },
      groupsData: [],
    }
  },
  props: {
    contactData: {
      type: Object,
      required: true,
    },
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
    GroupSelect,
  },
  emits: [
    "closeModal"
  ],
  methods: {
    /**
     * @description moves the contact data onto form
     */
    fillFormFromContact(): void {
      this.form.name = this.contactData?.name ?? null;
      this.form.description = this.contactData?.description ?? null;
      this.form.imagePath = this.contactData?.imagePath ?? null;
      this.form.groupId = this.contactData?.groupId ?? null;
    },
    /**
     * @description when submitting the form, saves the data on backend
     */
    async onSubmit(): Promise<void> {
      let usedId = this?.contactData?.id ?? null;
      let config = new BackendModuleCallConfig(SymfonyContactsRoutes.CONTACTS_BASE_URL, usedId, BaseApiResponse, this.form);
      config.reload = false;

      if (usedId) {
        await this.$moduleCall.update(config);
      } else {
        await this.$moduleCall.new(config);
      }

      this.contactsStore.getAll();

      /**
       * @description decided to close the modal when new entry is created, otherwise
       *              updating the data would require messy logic, which I want to avoid here.
       *              It's doable, but it's not worth it (at least now).
       *              Yes the contacts data tab will be lost, but it's quicker this way.
       *
       *              There is an idea for this:
       *              - getting latest fetched contact, and the turning the "new modal" into "edit modal", but
       *                didn't wanted to mess with this for now
       */
      if (!usedId) {
        this.$emit('closeModal')
      }
    },
    /**
     * @description fetches information about all the existing contact groups
     */
    async getGroups(): Promise<void> {
      let store = GroupStore();
      await store.getAll();

      for (let group of store.allEntries) {
        this.groupsData.push({
          color: `#${group.color}`,
          name: group.name,
          id: group.id
        });
      }
    }
  },
  beforeMount(): void {
    this.contactsStore = ContactsStore();
    this.fillFormFromContact();
    this.getGroups();
  },
  watch: {
    contactData(): void {
      this.fillFormFromContact();
    }
  }
}
</script>