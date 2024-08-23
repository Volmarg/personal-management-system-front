<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="hoverText"
  >
    <FullRoundButtonWithIcon :slide-able="false">
      <template #icon>
        <fa icon="plus" />
      </template>
    </FullRoundButtonWithIcon>
  </FloatingBox>
</template>

<script lang="ts">

import FullRoundButtonWithIcon from "@/components/Navigation/Button/FullRoundButtonWithIcon.vue";

import FloatingBox from "@/components/Ui/Containers/FloatingBox.vue";

export default {
  components: {
    FloatingBox,
    FullRoundButtonWithIcon
  },
  props: {
    hoverText: {
      type: [String, null],
      default: null,
    }
  },
  emits: [
    'click'
  ]
}
</script>