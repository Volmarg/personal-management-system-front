<template>
  <Base :info-block-description="$t('achievements.list.description')"
        :is-in-container="false"
  >

    <!-- cards -->
    <div class="flex flex-wrap">
      <div class="main-wrapper self-baseline"
           v-for="(achievements, type) in achievementsForTypes"
           :key="type"
      >
        <div class="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-1 md:m-6">

          <h2 class="text-lg mt-1">{{ type.toUpperCase() }}</h2>
          <Achievement v-for="achievement in achievements"
                       :key="JSON.stringify(achievement)"
                       :type="type"
                       :name="achievement.name"
                       :description="achievement.description"
                       @click="isEditModalVisible = true; activeAchievement = achievement;"
          />

        </div>
      </div>
    </div>

    <!-- bottom -->
    <Container>
      <AddEditForm :header="$t('achievements.list.form.header')"
                   @submit="fetchData"
      />
    </Container>
  </Base>

  <RemoveModal :is-modal-visible="isRemoveModalVisible"
               :achievement-data="activeAchievement"
               @modal-closed="isRemoveModalVisible = false; activeAchievement = null;"
               @remove-confirm-click="onRemoveConfirm"
               class="relative z-30"
  />

  <EditModal :is-modal-visible="isEditModalVisible"
             :achievement-data="activeAchievement"
             @modal-closed="isEditModalVisible = false; activeAchievement = null;"
             @confirm-click="isEditModalVisible = false; activeAchievement = null; fetchData()"
             @remove-click="isRemoveModalVisible = true"
             class="relative z-21"
  />
</template>

<script lang="ts">
import {ComponentData}           from "@/scripts/Vue/Types/Components/types";
import SymfonyAchievementsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyAchievementsRoutes";

import AddEditForm from "@/views/Modules/Achievements/Components/AddEditForm.vue";
import Achievement from "@/views/Modules/Achievements/Components/Achievement.vue";
import Container   from "@/components/Ui/Containers/Container.vue";
import Base        from "@/views/Modules/Base.vue";
import EditModal   from "@/views/Modules/Achievements/Components/EditModal.vue";
import RemoveModal from "@/views/Modules/Achievements/Components/RemoveModal.vue";

export default {
  data(): ComponentData {
    return {
      activeAchievement: null,
      isRemoveModalVisible: false,
      isEditModalVisible: false,
      achievementsForTypes: [],
    }
  },
  components: {
    RemoveModal,
    EditModal,
    AddEditForm,
    Achievement,
    Container,
    Base,
  },
  methods: {
    /**
     * @description handle record removal, close modals, update list, removes entry on backend
     */
    async onRemoveConfirm(): Promise<void> {
      this.isRemoveModalVisible = false;
      this.isEditModalVisible = false;
      await this.$moduleCall.remove(SymfonyAchievementsRoutes.ACHIEVEMENTS_BASE_URL, this.activeAchievement.id, false);

      this.activeAchievement = null;
      this.fetchData();
    },
    /**
     * @description fetches the achievements from backend
     */
    async fetchData(): Promise<void> {
      this.achievementsForTypes = await this.$moduleCall.getAll(SymfonyAchievementsRoutes.ACHIEVEMENTS_BASE_URL);
    }
  },
  beforeMount(): void {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  @apply flex flex-wrap items-center justify-center w-full max-w-full lg:max-w-md xl:max-w-sm
}
</style>