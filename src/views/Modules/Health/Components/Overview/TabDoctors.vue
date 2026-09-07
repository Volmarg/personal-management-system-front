<template>
  <div>
    <div v-if="doctors.length > 0"
         class="flex flex-wrap justify-center"
    >
      <DoctorCard v-for="doctor in doctors"
                  :key="doctor.id"
                  :doctor="doctor"
      />
    </div>

    <div v-else>
      <NoResultsText />
    </div>
  </div>

  <FloatingRoundedPlus class="mb-10"
                       @click="isAddNewModalVisible = true"
                       v-tippy="$t('health.overview.tabs.doctors.sidebarNav.add.text')"
  />

  <teleport to="body">
    <ViewEditModal :is-modal-visible="isAddNewModalVisible"
                   :modal-title="$t('health.overview.tabs.doctors.modal.createEdit.title.create')"
                   @modal-closed="isAddNewModalVisible = false"
                   class="relative z-20"
    />
  </teleport>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

import DoctorCard          from "@/views/Modules/Health/Components/Overview/TabDoctor/DoctorCard.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";
import ViewEditModal       from "@/views/Modules/Health/Components/Overview/TabDoctor/ViewEditModal.vue";

export default {
  data(): ComponentData {
    return {
      isAddNewModalVisible: false,
      store: null,
      doctors: [],
    }
  },
  components: {
    FloatingRoundedPlus,
    ViewEditModal,
    NoResultsText,
    DoctorCard,
  },
  async beforeMount(): Promise<void> {
    this.store = DoctorStore();
    await this.store.getAll();
    this.doctors = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.doctors = this.store.allEntries;
      }
    }
  }
}
</script>
