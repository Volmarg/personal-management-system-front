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
import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

import FullRoundButtonWithIcon from "@/components/Navigation/Button/FullRoundButtonWithIcon.vue";
import FloatingBox             from "@/components/Ui/Containers/FloatingBox.vue";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

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
  mixins: [
    ResponseHandlerMixin,
  ],
  computed: {
    /**
     * @description check if current dir is locked
     */
    isLocked(): boolean {
      return StorageState().activeNodeData.isLocked;
    },
  },
  methods: {
    /**
     * @description toggle lock on this dir
     */
    toggleLock(): void {
      let data = {
        dir: this.$route.query.dir,
        moduleName: StorageState().moduleName,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_TOGGLE_LOCK_URL);
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().clearSelectedFiles();
          StorageState().getAll();
        }
      })

    }
  }
}
</script>