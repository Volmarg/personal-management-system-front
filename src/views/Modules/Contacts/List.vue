<template>
  <Base :info-block-description="$t('contacts.description')"
        :is-in-container="false"
  >
    <div class="flex justify-end mt-6">
      <SearchInput v-model="searchedValue" />

      <div class="w-full md:w-1/5 lg:w-1/6">
        <GroupSelect :groups-data="groupsData"
                     v-model="selectedGroup"
        />
      </div>
    </div>

    <div v-if="contacts.length > 0"
         class="flex flex-wrap justify-center"
    >
      <SingleCard v-for="contactData in visibleContacts"
                  :contact-data="contactData"
                  :key="JSON.stringify(contactData.id)"
                  @edit-click="isAddEditModalVisible = true; handledContact = $event.contactData"
                  @remove-click="isRemoveModalVisible = true; handledContact = $event.contactData"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>
  </Base>

  <TypeEditModal :is-modal-visible="isTypeEditModalVisible"
                 :contact-id="handledContact?.id ?? null"
                 :data="handledType"
                 @modal-closed="isTypeEditModalVisible = false; handledType = null"
                 @remove-click="isTypeRemoveModalVisible = true"
                 @confirm-click="store.getAll()"
                 class="relative z-21"
  />

  <TypeRemoveModal :is-modal-visible="isTypeRemoveModalVisible"
                   :identifier="handledType?.uuid ?? null"
                   @modal-closed="isTypeRemoveModalVisible = false"
                   @remove-confirm-click="store.getAll(); handledType = null; isTypeEditModalVisible = false"
                   class="relative z-22"
  />

  <ContactAddEditModal :is-modal-visible="isAddEditModalVisible"
                       :data="handledContact"
                       @modal-closed="isAddEditModalVisible = false; handledContact = null"
                       @add-new-click="onAddNewClick"
                       @single-contact-type-click="isTypeEditModalVisible = true; handledType = $event.typeData"
                       @contact-type-form-submit="store.getAll()"
                       class="relative z-20"
  />

  <ContactRemoveModal :is-modal-visible="isRemoveModalVisible"
                      :identifier="handledContact?.id ?? null"
                      @modal-closed="isRemoveModalVisible = false"
                      @remove-confirm-click="store.getAll(); handledContact = null"
                      class="relative z-20"
  />

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddEditModalVisible = true"
                       v-tippy="$t('contacts.button.addNew.hoverText')"
  />
</template>

<script lang="ts">
import Base                from "@/views/Modules/Base.vue";
import SingleCard          from "@/views/Modules/Contacts/Components/ContactSingleCard.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";
import SearchInput         from "@/components/Navigation/SearchInput.vue";
import GroupSelect         from "@/views/Modules/Contacts/Components/GroupSelect.vue";

import TypeRemoveModal from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData/TypeRemoveModal.vue";
import TypeEditModal   from "@/views/Modules/Contacts/Components/ContactAddEditModal/Tabs/TabContactsData/TypeEditModal.vue";
import ContactRemoveModal     from "@/views/Modules/Contacts/Components/ContactRemoveModal.vue";
import ContactAddEditModal    from "@/views/Modules/Contacts/Components/ContactAddEditModal.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {ContactsStore}   from "@/scripts/Vue/Store/Module/Contacts/ContactsStore";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      handledContact: null,
      handledType: null,
      searchedValue: null,
      selectedGroup: null,
      store: null as null | StoreDefinition,
      contacts: [],
      isAddEditModalVisible: false,
      isRemoveModalVisible: false,
      isTypeEditModalVisible: false,
      isTypeRemoveModalVisible: false,
    }
  },
  components: {
    Base,
    SingleCard,
    NoResultsText,
    FloatingRoundedPlus,
    ContactRemoveModal,
    ContactAddEditModal,
    TypeEditModal,
    TypeRemoveModal,
    SearchInput,
    GroupSelect,
  },
  computed: {
    /**
     * @description returns contact groups data
     */
    groupsData(): Array {
      let data = [];
      let addedIds = [];
      for (let contact of this.contacts) {
        if (addedIds.includes(contact.groupId)) {
          continue;
        }

        data.push({
          color: `#${contact.groupColor}`,
          name: contact.groupName,
          id: contact.groupId
        });

        addedIds.push(contact.groupId);
      }

      return data;
    },
    /**
     * @description returns visible contacts, after filtering them out
     */
    visibleContacts(): Array {
      let filtered = [];
      for (let contact of this.contacts) {

        if (
               (!this.searchedValue || contact.name.toLowerCase().includes(this.searchedValue.toLowerCase()))
            && (!this.selectedGroup || contact.groupId === this.selectedGroup)
        ) {
          filtered.push(contact);
          continue;
        }

        for (let type of contact.types) {
          if (
                 (!this.searchedValue || type.details.toLowerCase().includes(this.searchedValue.toLowerCase()))
              && (!this.selectedGroup || contact.groupId === this.selectedGroup)
          ) {
            filtered.push(contact);
            break;
          }
        }
      }

      return filtered;
    },
  },
  methods: {
    /**
     * @description provides some fixes for legacy PMS 1.0
     */
    contactLegacyFixes(): void {
      this.contacts.forEach((singleContact) => {
        /**
         * @description if contact image was not provided then placeholder was used, this can be easily fixed with
         *              migration, but the goal for 2.0.x is to NOT use any migrations at all (if possible).
         */
        if (StringTypeProcessor.isEmptyString(singleContact.imagePath) || singleContact.imagePath.includes("avatar_placeholder")) {
          singleContact.imagePath = "image/system/dummy-avatar.png";
        }
      });
    },
    /**
     * @description case no more entries are present in given group - reset the variable in order to show all entries
     */
    resetSelectedGroup(): void {
      let matchingGroup = null;
      for (let group of this.groupsData) {
        if (group.id === this.selectedGroup) {
          matchingGroup = group.id;
          break;
        }
      }

      if (!matchingGroup) {
        this.selectedGroup = null;
      }
    },
  },
  async beforeMount(): Promise<void> {
    this.store = ContactsStore()
    await this.store.getAll();
    this.contacts = this.store.allEntries;
    this.contactLegacyFixes();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.contacts = this.store.allEntries;
        this.contactLegacyFixes();
        this.resetSelectedGroup();
        if (!this.handledContact || !this.handledContact.id) {
          return;
        }

        /**
         * @description if entry gets updated in modal, then it needs to be passed in there in the update state,
         *              because the data in the modal itself is not getting tracked - it's easier && less complex this way
         */
        for (let contact of this.contacts) {
          if (this.handledContact.id === contact.id) {
            this.handledContact = contact;
            break;
          }
        }
      }
    }
  }
}
</script>
