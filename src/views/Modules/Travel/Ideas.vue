<template>
  <Base :info-block-description="$t('travels.description')"
        :is-in-container="false"
  >
    <div v-if="ideasData.length > 0">
      <SingleCategory v-for="ideaData in ideasData"
                     :key="JSON.stringify(ideaData)"
                     :category-name="ideaData.categoryName"
                     :locations-data="ideaData.locations"
                      @edit-click="isEditModalVisible = true"
                      @remove-click="isRemoveModalVisible = true"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>
  </Base>

  <AddNewModal :is-modal-visible="isAddNewModalVisible"
               @modal-closed="isAddNewModalVisible = false"
  />

  <EditModal :is-modal-visible="isEditModalVisible"
             @modal-closed="isEditModalVisible = false"
             @confirm-click="onEditConfirm"
  />

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               @modal-closed="isRemoveModalVisible = false"
               @remove-confirm-click="onRemoveConfirm"
  />

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddNewModalVisible = true"
                       v-tippy="$t('travels.button.addNew.hoverText')"
  />

</template>

<script lang="ts">
import Base           from "@/views/Modules/Base.vue";
import SingleCategory from "@/views/Modules/Travel/Components/SingleCategory.vue";
import NoResultsText  from "@/components/Page/NoResultsText.vue";

import EditModal   from "@/views/Modules/Travel/Components/EditModal.vue";
import AddNewModal from "@/views/Modules/Travel/Components/AddNewModal.vue";
import RemoveModal from "@/views/Modules/Travel/Components/RemoveModal.vue";

import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      isEditModalVisible: false,
      isRemoveModalVisible: false,
      /**
       * @description dummy data
       */
      ideasData: [
        {
          categoryName: "Country name 1",
          locations: [
            {
              location: 'location',
              country: 'country',
              imageUrl: 'http://personal-management-system.pl/assets/images/modules/travels/jasper-national-park-medicine-lake.jpg',
              mapUrl: 'http://www.mapcrunch.com/p/-14.892871_-70.588343_-163.81_-5_0'
            },
            {
              location: 'location',
              country: 'country',
              imageUrl: 'http://personal-management-system.pl/assets/images/modules/travels/moraine_lake_banff.jpg',
              mapUrl: 'http://www.mapcrunch.com/p/-14.892871_-70.588343_-163.81_-5_0'
            }
          ]
        },
        {
          categoryName: "Country name 2",
          locations: [
            {
              location: 'location',
              country: 'country',
              imageUrl: 'http://personal-management-system.pl/assets/images/modules/travels/jasper-national-park-medicine-lake.jpg',
              mapUrl: 'http://www.mapcrunch.com/p/-14.892871_-70.588343_-163.81_-5_0'
            },
            {
              location: 'location',
              country: 'country',
              imageUrl: 'http://personal-management-system.pl/assets/images/modules/travels/moraine_lake_banff.jpg',
              mapUrl: 'http://www.mapcrunch.com/p/-14.892871_-70.588343_-163.81_-5_0'
            }
          ]
        }
      ]
    }
  },
  components: {
    Base,
    EditModal,
    AddNewModal,
    RemoveModal,
    SingleCategory,
    NoResultsText,
    FloatingRoundedPlus,
  },
  methods: {
    /**
     * @description handle user confirming edit dialog, updates front and backend
     */
    onEditConfirm(): void {
      //
    },
    /**
     * @description handle user confirming remove dialog, updates front and backend
     */
    onRemoveConfirm: void {
      //
    }
  }
}
</script>