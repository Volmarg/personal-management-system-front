<template>
  <div class="w-full">
    <Accordion>
      <AccordionPanel class="accordion-panel">
        <template #title>{{categoryName}}</template>
        <template #content>
          <div class="mb-5 flex w-full">
            <LocationCard v-for="locationData in locationsData"
                          :key="JSON.stringify(locationData)"
                          :country="locationData.country"
                          :image-url="locationData.imageUrl"
                          :location="locationData.location"
                          :map-url="locationData.mapUrl"
                          @edit-click="$emit('editClick')"
                          @remove-click="$emit('removeClick')"
            />

          </div>
        </template>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script lang="ts">
import AccordionPanel from "@/components/Ui/Accordion/Panel.vue";
import Accordion      from "@/components/Ui/Accordion/Accordion.vue";

import LocationCard from "@/views/Modules/Travel/Components/LocationCard.vue";

export default {
  props: {
    categoryName: {
      type: String,
      required: true,
    },
    locationsData: {
      type: Array,
      required: true
    }
  },
  components: {
    Accordion,
    AccordionPanel,
    LocationCard
  },
  emits: [
    'editClick',
    'removeClick'
  ],
}
</script>