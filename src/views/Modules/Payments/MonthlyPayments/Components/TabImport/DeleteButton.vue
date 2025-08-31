<template>
  <MediumButtonWithIcon @button-click="$emit('deleteClick')"
                        margin-right-class-number="2"
                        background-color-class="bg-red-500"
                        v-tippy="{
                          content: $t('payments.monthly.tabs.import.step.processData.button.delete.popupMessage')
                        }"
  >
    <template #icon>
      <fa
          icon="trash"
          :is-margin-right="false"
      />
    </template>
  </MediumButtonWithIcon>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  components: {
    MediumButtonWithIcon,
  },
  emits: [
    'deleteClick'
  ]
}
</script>

