<template>
  <MediumButtonWithIcon @click.prevent="$emit('multiplyClick')"
                        :text="$t('payments.monthly.tabs.import.step.processData.button.multiply.label')"
                        margin-right-class-number="2"
  />
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  components: {
    MediumButtonWithIcon,
  },
  emits: [
    'multiplyClick'
  ]
}
</script>

