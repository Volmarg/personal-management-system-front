<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="$t('storage.nav.button.removeFolder.label')"
  >
    <FullRoundButtonWithIcon :slide-able="false"
                             background-color-class-name="bg-red-500"
    >
      <template #icon>
        <fa icon="folder" />
        <fa icon="minus"
            class="absolute -ml-5 mt-2.5 text-xs text-gray-500"
        />
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