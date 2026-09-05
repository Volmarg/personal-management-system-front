<template>
  <div class="main-wrapper">
    <div class="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-1 md:m-6 h-116 md:h-100 pb-10">

      <!-- top color fill -->
      <div class="h-32 overflow-hidden z-1">
        <div class="h-full z-1 bg-blue-200 bg-opacity-30">

          <div class="pt-2">
            <QuestionMarkAbout :text="doctor.information"/>
          </div>

          <h2 class="text-xl font-bold text-blue-500">{{ doctor.name }}</h2>
          <p class="mt-2 text-gray-500 px-2">{{ doctor.specialisation }}</p>
          <p class="mt-2 text-gray-500 px-2">{{ doctor.address }}</p>
        </div>
      </div>

      <div class="flex-row justify-between">
        <div class="mt-4 h-48">
          <div class="px-7 mb-8">
            <p class="font-bold text-left mt-2">
              {{$t('health.overview.tabs.doctors.card.label.contacts')}}
            </p>
            <!-- contact types -->
            <div class="contacts-wrapper"
                 v-if="doctor.contacts.length > 0"
            >
              <div class="contacts">
                <div class="contact-data"
                     v-for="contact in doctor.contacts"
                     :key="contact.uuid"
                >
                  <div class="contact-details">
                    <span class="font-bold">{{contact.type}}: </span>
                    <span>{{contact.value}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else
                 class="text-gray-400 my-10"
            >
              {{$t('health.overview.tabs.doctors.card.text.noContacts')}}
            </div>

          </div>
        </div>

        <div class="md:grid grid-cols-1 md:grid-cols-2">
          <MediumButtonWithIcon :text="$t('health.overview.tabs.doctors.card.button.edit.label')"
                                button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                                class="w-full mb-1 pl-2 pr-2 md:col-start-1 md:col-end-2"
                                button-classes="w-full m-0-force"
                                text-classes="text-center w-full"
                                @button-click="isViewEditModalVisible = true"
          />

          <MediumButtonWithIcon :text="$t('health.overview.tabs.doctors.card.button.remove.label')"
                                class="w-full mb-1 pl-2 pr-2"
                                button-classes="w-full m-0-force"
                                text-classes="text-center w-full"
                                background-color-class="bg-red-500"
          />
        </div>
      </div>

    </div>
  </div>

  <teleport to="body">
    <ViewEditModal :is-modal-visible="isViewEditModalVisible"
                   :doctor="doctor"
                   @modal-closed="this.isViewEditModalVisible = false"
                   @files-saved="$emit('filesSaved')"
                   class="relative z-20"
    />
  </teleport>
</template>

<script lang="ts">
import QuestionMarkAbout from "@/components/Ui/QuestionMarkAbout.vue";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import ViewEditModal        from "@/views/Modules/Health/Components/Overview/TabDoctor/ViewEditModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isViewEditModalVisible: false,
    }
  },
  props: {
    doctor: {
      type: Object,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    QuestionMarkAbout,
    ViewEditModal,
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

.contacts-wrapper {
  max-height: 130px;
  @apply overflow-hidden overflow-y-scroll
}

.contacts {
  @apply flex flex-wrap flex-col justify-center gap-2 mt-3
}
</style>