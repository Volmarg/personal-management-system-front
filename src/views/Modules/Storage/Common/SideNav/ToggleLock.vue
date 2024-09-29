<template>
  <FloatingBox
      :show-background="false"
      @click="$emit('click')"
      v-tippy="isLocked ? $t('storage.nav.button.lock.unlock') : $t('storage.nav.button.lock.doLock')"
  >
    <FullRoundButtonWithIcon :slide-able="false"
                             :background-color-class-name="isLocked ? 'bg-red-500' : 'bg-green-500'"
                             @click="toggleLock"
    >
      <template #icon>
        <fa v-if="isLocked"
            icon="lock"
        />

        <fa v-else
            icon="lock-open"
        />
      </template>
    </FullRoundButtonWithIcon>
  </FloatingBox>
</template>

<script lang="ts">

import FullRoundButtonWithIcon from "@/components/Navigation/Button/FullRoundButtonWithIcon.vue";
import FloatingBox             from "@/components/Ui/Containers/FloatingBox.vue";

import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

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
  ],
  computed: {
    /**
     * @description check if current dir is locked
     */
    isLocked(): boolean {
      return storageModuleState().activeNodeData.isLocked;
    },
  },
  methods: {
    /**
     * @description toggle lock on this dir
     */
    toggleLock(): void {
      // todo:
    }
  }
}
</script>