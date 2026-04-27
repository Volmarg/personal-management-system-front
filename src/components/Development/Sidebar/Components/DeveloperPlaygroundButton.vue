<template>
  <div>

    <div class="flex flex-row justify-end">
      <QuestionMarkAbout :text="helpText"
                     class="align-self-center"
      />

      <RouterLink :to="route"
                   class="mt-2 block"
                  v-if="!!route"
      >
        <MediumButtonWithIcon :text="labelText"
                                 :margin-right-class-number="0"
        >
          <template #icon>
            <fa icon="wrench"/>
          </template>
        </MediumButtonWithIcon>
      </RouterLink>

      <a :href="url"
         v-else
         target="_blank"
         class="mt-2"
       >
        <MediumButtonWithIcon :text="labelText"
                              :margin-right-class-number="0"
        >
          <template #icon>
            <fa icon="wrench"/>
          </template>
        </MediumButtonWithIcon>
      </a>

    </div>

  </div>
</template>

<script lang="ts">
import QuestionMarkAbout    from "@/components/Ui/QuestionMarkAbout.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  props: {
    helpText: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: null
    },
    route: {
      type: String,
      required: false,
      default: null
    }
  },
  components: {
    QuestionMarkAbout,
    MediumButtonWithIcon
  }
}
</script>