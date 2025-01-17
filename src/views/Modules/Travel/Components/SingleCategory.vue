<template>
  <div class="w-full">
    <Accordion>
      <AccordionPanel class="accordion-panel">
        <template #title>{{ideaData.categoryName}}</template>
        <template #content>
          <div class="mb-5 flex w-full flex-wrap justify-center">
            <LocationCard v-for="locationData in ideaData.locations"
                          :key="JSON.stringify(locationData)"
                          :location-data="locationData"
                          @edit-click="$emit('editClick', $event)"
                          @remove-click="$emit('removeClick', $event)"
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
    ideaData: {
      type: Object,
      required: true,
    },
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