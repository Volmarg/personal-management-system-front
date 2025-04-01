<template>
  <div class="main-wrapper">
    <div class="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-1 md:m-6">

      <!-- top color fill -->
      <div class="h-32 overflow-hidden z-1">
        <div class="h-full opacity-30 z-1"
             :class="{
              'bg-blue-200': !contactData.groupColor
             }"
             :style="{
              'background-color': `#${contactData.groupColor}`
             }"
        />
      </div>

      <!-- image wrapper -->
      <div class="flex justify-center px-5 -mt-12 mb-5 z-2 relative">
        <span clspanss="block relative h-32 w-32">
          <img :src="contactData.imagePath"
               class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
          />
        </span>
      </div>

      <div class="">
        <div class="px-7 mb-8">
          <h2 class="text-2xl font-bold"
              :style="{
                'color': textColor
              }"
          >{{ contactData.name }}</h2>
          <p class="mt-2 text-gray-500">{{ contactData.description }}</p>
          <hr class="mt-1"/>
          <p class="mt-2 text-gray-500">{{ contactData.groupName }}</p>

          <!-- contact types -->
          <div class="contact-types-wrapper">
            <div class="contact-types"
            >
              <div class="contact-data"
                   v-for="contactType in contactData.types"
                   :key="JSON.stringify(contactType.uuid)"
              >
                <div class="img-wrapper"><img :src="getFilePublicPath(contactType.icon_path)" /></div>
                <div class="contact-details">
                  <p>{{contactType.name}}</p>
                  <p>{{contactType.details}}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    <div class="md:grid grid-cols-1 md:grid-cols-2 mb-2">
      <MediumButtonWithIcon :text="$t('contacts.button.edit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 pl-2 pr-2 md:col-start-1 md:col-end-2"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            @button-click="$emit('editClick', {contactData: contactData})"
      />

      <MediumButtonWithIcon :text="$t('contacts.button.remove.label')"
                            class="w-full mb-1 pl-2 pr-2"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-red-500"
                            @button-click="$emit('removeClick', {contactData: contactData})"
      />
    </div>

    </div>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import PublicFolderAwareMixin from "@/mixins/Awarness/PublicFolderAwareMixin.vue";

export default {
  props: {
    contactData: {
      type: Object,
      required: true,
    },
    textColor: {
      type: String,
      required: false,
      default: 'rgb(59, 130, 246)' // text-blue-500
    }
  },
  mixins: [
    PublicFolderAwareMixin
  ],
  components: {
    MediumButtonWithIcon
  },
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  @apply flex flex-wrap items-center justify-center w-full max-w-full lg:max-w-md xl:max-w-sm
}

.contact-data {
  @apply flex flex-row text-left text-gray-500
}

.contact-types-wrapper{
  max-height: 190px;
  @apply overflow-hidden overflow-y-scroll
}

.contact-types {
  .img-wrapper {
    min-width: 50px;
  }

  img {
    @apply h-8 rounded-lg
  }

  @apply flex flex-wrap flex-col justify-center gap-2 sm:gap-4 mt-8
}
</style>