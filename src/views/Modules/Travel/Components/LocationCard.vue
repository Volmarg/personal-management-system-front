<template>
  <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 card">
    <div class="image-wrapper">
      <img class="image"
           :src="locationData.imageUrl"
      />
    </div>

    <div class="p-5">
      <h5 class="mb-2 text-2md font-bold tracking-tight text-gray-900 dark:text-white break-all">{{locationData.country}}</h5>
      <hr/>
      <p class="mb-2 break-all">{{locationData.location}}</p>

      <a :href="locationData.mapUrl"
         target="_blank"
      >
        <MediumButtonWithIcon :text="$t('travels.ideas.button.map.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1"
                              button-classes="w-full m-0-force"
                              text-classes="text-center w-full"
                              @click="onMapClick"
        />
      </a>

      <MediumButtonWithIcon :text="$t('travels.ideas.button.edit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            @button-click="$emit('editClick', {locationData: locationData})"
      />

      <MediumButtonWithIcon :text="$t('travels.ideas.button.remove.label')"
                            class="w-full mb-1"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-red-500"
                            @button-click="$emit('removeClick', {locationData: locationData})"
      />

    </div>

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  props: {
    locationData: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'editClick',
    'removeClick'
  ],
  components: {
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description opens map in new tab
     */
    onMapClick(): void {
      window.open(this.locationData.mapUrl, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  max-height: 180px;
  @apply rounded-t-lg object-fill overflow-hidden
}

.image {
  width: 100%;
}

.card {
  min-width: 260px;
  max-width: 320px;
}
</style>