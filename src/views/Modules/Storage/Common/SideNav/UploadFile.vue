<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="$t('storage.nav.button.uploadFile.label')"
  >
    <FullRoundButtonWithIcon :slide-able="false">
      <template #icon>
        <fa icon="upload" />
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
  emits: [
    'click'
  ]
}
</script>