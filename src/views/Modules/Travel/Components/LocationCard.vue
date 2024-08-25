<template>
  <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
    <div class="image-wrapper">
      <img class="image"
           :src="imageUrl"
      />
    </div>

    <div class="p-5">
      <h5 class="mb-2 text-2md font-bold tracking-tight text-gray-900 dark:text-white">{{country}}</h5>
      <hr/>
      <p class="mb-2">{{location}}</p>

      <a :href="mapUrl"
         target="_blank"
      >
        <MediumButtonWithIcon :text="$t('travels.button.map.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1"
                              button-classes="w-full m-0-force"
                              text-classes="text-center w-full"
        />
      </a>

      <MediumButtonWithIcon :text="$t('travels.button.edit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            @button-click="$emit('editClick')"
      />

      <MediumButtonWithIcon :text="$t('travels.button.remove.label')"
                            class="w-full mb-1"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-red-500"
                            @button-click="$emit('removeClick')"
      />

    </div>

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  props: {
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    mapUrl: {
      type: String,
      required: true,
    },
  },
  emits: [
    'editClick',
    'removeClick'
  ],
  components: {
    MediumButtonWithIcon
  }
}
</script>

<style lang="scss">
.image-wrapper {
  max-height: 180px;
  @apply rounded-t-lg object-fill overflow-hidden
}
</style>