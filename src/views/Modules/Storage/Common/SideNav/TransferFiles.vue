<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="$t('storage.nav.button.move.label')"
  >
    <FullRoundButtonWithIcon :slide-able="false"
                             :is-disabled="isDisabled"
    >
      <template #icon>
        <fa icon="random" />
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