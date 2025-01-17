<template>
  <Base :info-block-description="$t('travels.ideas.description')"
        :is-in-container="false"
  >
    <div v-if="structuredIdeas.length > 0">
      <SingleCategory v-for="ideaData in structuredIdeas"
                     :key="ideaData.categoryName"
                      :idea-data="ideaData"
                      @edit-click="isAddEditModalVisible = true; handledLocationData = $event.locationData"
                      @remove-click="isRemoveModalVisible = true; handledLocationData = $event.locationData"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>
  </Base>

  <AddEditModal :is-modal-visible="isAddEditModalVisible"
                :edited-data="handledLocationData"
                :header="addEditHeader"
                @modal-closed="isAddEditModalVisible = false; handledLocationData = null;"
                @form-submitted="isAddEditModalVisible = false; handledLocationData = null; store.getAll()"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               :id="handledLocationData?.id ?? null"
               @modal-closed="isRemoveModalVisible = false"
               @remove-confirm-click="isRemoveModalVisible = false; handledLocationData = null; store.getAll()"
  />

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddEditModalVisible = true"
                       v-tippy="$t('travels.ideas.button.addNew.hoverText')"
  />

</template>

<script lang="ts">
import Base           from "@/views/Modules/Base.vue";
import SingleCategory from "@/views/Modules/Travel/Components/SingleCategory.vue";
import NoResultsText  from "@/components/Page/NoResultsText.vue";

import AddEditModal from "@/views/Modules/Travel/Ideas/AddEditModal.vue";
import RemoveModal  from "@/views/Modules/Travel/Components/RemoveModal.vue";

import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import {ComponentData}    from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition}  from "pinia";
import {TravelIdeasStore} from "@/scripts/Vue/Store/Module/Travel/IdeasStore";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      handledLocationData: null as null | Record,
      ideas: [],
      isAddEditModalVisible: false,
      isRemoveModalVisible: false,
    }
  },
  components: {
    Base,
    AddEditModal,
    RemoveModal,
    SingleCategory,
    NoResultsText,
    FloatingRoundedPlus,
  },
  computed: {
    /**
     * @description returns header for the add/edit modal
     */
    addEditHeader(): string {
      if (!this.handledLocationData) {
        return this.$t('travels.ideas.form.header.add');
      }

      return this.$t('travels.ideas.form.header.edit');
    },
    /**
     * @description returns the categories data in form friendly for already prepared view structure
     */
    structuredIdeas(): Array {
      let data = [];
      let categoriesData = [];
      for (let idea of this.ideas) {
        if (!categoriesData[idea.category]) {
          categoriesData[idea.category] = {locations: [] as Array<Record>};
        }

        categoriesData[idea.category].locations.push({
          id: idea.id,
          location: idea.location,
          country: idea.country,
          category: idea.category,
          imageUrl: idea.imageUrl,
          mapUrl: idea.mapUrl,
        })
      }

      for (let category in categoriesData) {
        let categoryData = categoriesData[category];

        data.push({
          categoryName: category,
          locations: categoryData.locations
        });
      }

      return data;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = TravelIdeasStore();
    await this.store.getAll();
    this.ideas = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.ideas = this.store.allEntries;
      }
    }
  }
}
</script>