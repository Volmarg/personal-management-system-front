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
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

import DoctorCard    from "@/views/Modules/Health/Components/Overview/TabDoctor/DoctorCard.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

export default {
  data(): ComponentData {
    return {
      store: null,
      doctors: [],
    }
  },
  components: {
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
