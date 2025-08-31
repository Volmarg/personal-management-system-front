<template>
  <MediumButtonWithIcon :text="$t('payments.monthly.tabs.import.step.processData.button.reset.label')"
                        @button-click="$emit('resetClick')"
                        background-color-class="bg-blue-500"
  />
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  components: {
    MediumButtonWithIcon,
  },
  emits: [
    'resetClick'
  ]
}
</script>

