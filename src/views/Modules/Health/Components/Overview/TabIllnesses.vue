<template>
  <div class="flex flex-wrap w-full">
      <Block v-for="illness in illnesses"
             :key="illness.id"
             :illness="illness"
             @files-saved="onFilesSave"
             ref="illnessBlock"
      />
  </div>

  <teleport to="body">
    <FloatingRoundedPlus class="mb-10"
                         @click="isAddNewModalVisible = true"
                         v-tippy="$t('health.overview.tabs.illnesses.sidebarNav.add.text')"
                         v-if="tabName === $parent.activeTabName"
    />

    <ViewEditModal :is-modal-visible="isAddNewModalVisible"
                   @modal-closed="onAddNewModalClose"
                   class="relative z-20"
    />
  </teleport>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Block               from "@/views/Modules/Health/Components/Overview/TabIllness/Block.vue";
import ViewEditModal       from "@/views/Modules/Health/Components/Overview/TabIllness/ViewEditModal.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import {IllnessStore} from "@/scripts/Vue/Store/Module/Health/IllnessStore";

import BaseError      from "@/scripts/Core/Error/BaseError";
import PromiseService from "@/scripts/Core/Services/Promise/PromiseService";

export default {
  data(): ComponentData {
    return {
      store: null,
      illnesses: [],
      isAddNewModalVisible: false,
    }
  },
  props: {
    tabName: {
      type: String,
      required: true,
    }
  },
  components: {
    FloatingRoundedPlus,
    ViewEditModal,
    Block
  },
  methods: {
    /**
     * @description wait for new block to be added and open its edit modal. The "create" modal has only the illness form
     *              while "edit" has files and other things. We want to be able to add more things to newly created issue.
     */
    onAddNewModalClose(data): void {
      this.isAddNewModalVisible = false
      if (!data.id) {
        throw new BaseError("Illness id is missing in the data object");
      }

      let findMatchingBlock= () => {
        return this.$refs.illnessBlock.find((block)=> block.illness.id === data.id);
      };

      this.$rootEvent.showFullPageLoader();
      PromiseService.buildPeriodicallyCheckedPromise(() => {
        return findMatchingBlock() !== undefined;
      }).then(() => {
        this.$rootEvent.hideFullPageLoader();
        let matchingBlock = findMatchingBlock();
        matchingBlock.openEditModal();
      })
    },
    /**
     * @description refreshes illnesses states when files gets saved
     */
    async onFilesSave(): Promise<void> {
      await this.store.getAll();
      this.illnesses = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = IllnessStore();
    await this.store.getAll();
    this.illnesses = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.illnesses = this.store.allEntries;
      }
    }
  }
}
</script>
