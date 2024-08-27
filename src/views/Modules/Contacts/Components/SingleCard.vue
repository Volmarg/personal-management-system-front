<template>
  <div class="main-wrapper">
    <div class="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-1 md:m-6">

      <!-- top color fill -->
      <div class="h-32 overflow-hidden">
        <div class="bg-blue-200 h-full" />
      </div>

      <!-- image wrapper -->
      <div class="flex justify-center px-5 -mt-12 mb-5">
        <span clspanss="block relative h-32 w-32">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
               class="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
          />
        </span>
      </div>

      <div class="">
        <div class="px-7 mb-8">
          <h2 class="text-3xl font-bold"
              :style="{
                'color': textColor
              }"
          >Beth J. Greene</h2>
          <p class="mt-2 text-gray-500">Illustrator</p>
          <hr class="mt-1"/>
          <p class="mt-2 text-gray-500">Group</p>

          <!-- contact types -->
          <div class="contact-types-wrapper">
            <div class="contact-types"
            >
              <div class="contact-data"
                   v-for="contactType in contactTypes"
                   :key="JSON.stringify(contactType)"
              >
                <div class="img-wrapper"><img :src="contactType.imgUrl" /></div>
                <div class="contact-details">
                  <p>{{contactType.name}}</p>
                  <p>{{contactType.value}}</p>
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
                            @button-click="$emit('editClick')"
      />

      <MediumButtonWithIcon :text="$t('contacts.button.remove.label')"
                            class="w-full mb-1 pl-2 pr-2"
                            button-classes="w-full m-0-force"
                            text-classes="text-center w-full"
                            background-color-class="bg-red-500"
                            @button-click="$emit('removeClick')"
      />
    </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      /**
       * @description dummy data
       */
      contactTypes: [
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/linkedin.png',
          name: "Linkedin",
          value: "#Linkedin"
        },
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/spotify.png',
          name: "Spotify",
          value: "@Spotify"
        },
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/mail.png',
          name: "Email",
          value: "@Mail"
        },
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/steam.png',
          name: "Steam",
          value: "~Steam"
        },
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/mobile.png',
          name: "Mobile",
          value: "+Mobile"
        },
        {
          imgUrl: 'http://personal-management-system.pl/upload/images/system/contactIcons/github.png',
          name: "Github",
          value: "[]Github"
        },
      ]
    }
  },
  props: {
    textColor: {
      type: String,
      required: false,
      default: 'rgb(59, 130, 246)' // text-blue-500
    }
  },
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