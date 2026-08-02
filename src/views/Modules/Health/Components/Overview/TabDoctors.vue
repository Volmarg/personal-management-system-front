<template>
  {{doctors}}
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {DoctorStore} from "@/scripts/Vue/Store/Module/Health/DoctorStore";

export default {
  data(): ComponentData {
    return {
      store: null,
      doctors: [],
    }
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
