<template>
  <Base :info-block-description="$t('achievements.list.description')"
        :is-in-container="false"
  >

    <!-- cards -->
    <div class="flex flex-wrap">

      <div class="main-wrapper self-baseline"
           v-for="(achievements, type) in achievementsTypes"
           :key="type"
      >
        <div class="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-1 md:m-6">

          <h2 class="text-lg mt-1">{{ type.toUpperCase() }}</h2>
          <Achievement v-for="achievement in achievements"
                       :key="JSON.stringify(achievement)"
                       :type="type"
                       :name="achievement.name"
                       :description="achievement.description"
          />

        </div>
      </div>
    </div>

    <!-- bottom -->
    <Container>
      <div class="flex justify-center">
        <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
          <h2 class="text-lg">{{ $t('achievements.list.form.header') }}</h2>

          <FormInput type="text"
                     :model-value="form.name"
                     :label="$t('achievements.list.form.name.label')"
          />

          <FormInput type="text"
                     :model-value="form.description"
                     :label="$t('achievements.list.form.description.label')"
          />

          <MediumButtonWithIcon :text="$t('achievements.list.form.submitButton.label')"
                                button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                                class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                                button-classes="w-full md:w-auto m-0-force"
                                text-classes="text-center w-full"
                                @button-click="onNewSubmit"
          />

        </div>
      </div>
    </Container>
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Achievement          from "@/views/Modules/Achievements/Components/Achievement.vue";
import Container            from "@/components/Ui/Containers/Container.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Base                 from "@/views/Modules/Base.vue";

export default {
  data(): ComponentData {
    return {
      /**
       * @description dummy data
       */
      achievementsTypes: {
        "simple": [
          {
            name: "This is a name",
            description: "This is a description. This is a description. This is a description. This is a description. This is a description"
          },
          {
            name: "This is a name",
            description: "This is a description"
          }
        ],
        "medium": [
          {
            name: "This is a name",
            description: "This is a description"
          },
          {
            name: "This is a name",
            description: "This is a description"
          },
          {
            name: "This is a name",
            description: "This is a description"
          }
        ],
        "hard": [
          {
            name: "This is a name",
            description: "This is a description"
          },
          {
            name: "This is a name",
            description: "This is a description"
          }
        ],
        "hardcore": [
          {
            name: "This is a name",
            description: "This is a description"
          },
          {
            name: "This is a name",
            description: "This is a description"
          }
        ],
      },
      form: {
        name: '',
        description: '',
      },
      /**
       * @description dummy data for now
       */
    }
  },
  components: {
    MediumButtonWithIcon,
    Achievement,
    Container,
    FormInput,
    Base,
  },
  methods: {
    /**
     * @description triggered when user submits the form, updates front and back
     */
    onNewSubmit(): void {
      //
    },
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  @apply flex flex-wrap items-center justify-center w-full max-w-full lg:max-w-md xl:max-w-sm
}
</style>