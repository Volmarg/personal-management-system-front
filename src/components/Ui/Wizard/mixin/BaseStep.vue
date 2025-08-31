<template>
  <div>
    <slot></slot>
    <div class="flex w-full mt-10 px-4"
         :class="{
            'justify-between': !store.isFirstStep,
            'justify-end': store.isLastStep || store.isFirstStep
         }"
    >

      <MediumButtonWithIcon text="Go back"
                            @button-click="$emit('previous')"
                            background-color-class="bg-blue-500"
                            v-if="!store.isFirstStep"
      />

      <MediumButtonWithIcon text="Continue"
                            @button-click="$emit('next')"
                            background-color-class="bg-blue-500"
                            v-if="!store.isLastStep"
      />

      <MediumButtonWithIcon text="Finish"
                            @button-click="$emit('finish')"
                            background-color-class="bg-blue-500"
                            v-if="store.isLastStep"
      />

    </div>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {UploadWizardStore} from "@/scripts/Vue/Store/Module/Payments/Monthly/UploadWizardStore";

export default {
  data(): ComponentData {
    return {
      store: UploadWizardStore(),
    }
  },
  components: {
    MediumButtonWithIcon
  },
  emits: [
    "next",
    "previous",
    "finish",
  ]
}
</script>
