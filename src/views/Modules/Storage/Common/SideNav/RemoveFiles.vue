<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="$t('storage.nav.button.delete.label')"
  >
    <FullRoundButtonWithIcon :slide-able="false"
                             :is-disabled="isDisabled"
                             background-color-class-name="bg-red-500"
    >
      <template #icon>
        <fa icon="trash" />
      </template>
    </FullRoundButtonWithIcon>
  </FloatingBox>
</template>

<script lang="ts">

import FullRoundButtonWithIcon from "@/components/Navigation/Button/FullRoundButtonWithIcon.vue";

import FloatingBox from "@/components/Ui/Containers/FloatingBox.vue";

export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FloatingBox,
    FullRoundButtonWithIcon
  },
  emits: [
    'click'
  ]
}
</script>