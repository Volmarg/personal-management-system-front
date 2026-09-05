<template>
  <div>
    <p v-if="contacts.length > 0"
       class="lg:hidden block mt-4 text-lg text-black"
    >
      {{$t('health.overview.tabs.doctors.modal.createEdit.text.contacts')}}
    </p>

    <div class="contacts">
      <div v-for="contact in contacts"
           :key="contact.uuid"
           class="mx-1 md:mr-2"
      >
        <SingleContact :uuid="contact.uuid"
                       :type="contact.type"
                       :value="contact.value"
                       @on-delete="onContactDelete"
                       @change="onContactChange"
        />

        <hr class="my-2 lg:hidden block" />
      </div>
    </div>

    <div class="flex flex-row justify-end">
      <MediumButtonWithIcon :text="$t('health.overview.tabs.doctors.modal.createEdit.form.addContact.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full md:w-auto mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onAddContact"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BaseError from "@/scripts/Core/Error/BaseError";

import {v4 as uuidv4} from "uuid";

import SingleContact        from "@/views/Modules/Health/Components/Common/DoctorContact/SingleContact.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      contacts: [],
    }
  },
  props: {
    contactsInitialValue: {
      type: Array,
      required: false,
      default: () => [],
    }
  },
  components: {
    MediumButtonWithIcon,
    SingleContact,
  },
  emits: [
    "change"
  ],
  methods: {
    /**
     * @description wipes all the contacts
     */
    clear(): void {
      this.contacts = [];
    },
    /**
     * @description delete contact
     */
    onContactDelete(uuid: string): void {
      this.contacts = this.contacts.filter((contact: Record<string,string>) => contact.uuid !== uuid);
    },
    /**
     * @description track the new state of contact
     */
    onContactChange(eventContact: Record<string, string>): void {
      let matchingContact: object | null | undefined = this.contacts.find((contact: Record<string, string>) => contact.uuid === eventContact.uuid);
      if (!matchingContact) {
        throw new BaseError(`No contact found for uuid: ${eventContact.uuid}`);
      }

      Object.assign(matchingContact, eventContact);
    },
    onAddContact(): void {
      this.contacts.push({
        uuid: uuidv4(),
        type: "",
        value: ""
      })

    },
  },
  beforeMount(): void {
    this.contacts = this.contactsInitialValue;
  },
}
</script>

<style lang="scss" scoped>
.contacts {
  max-height: 300px;

  @apply overflow-hidden overflow-y-scroll
}
</style>