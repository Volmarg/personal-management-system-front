<template>
  <div class="flex flex-wrap w-full">
      <Block v-for="illness in illnesses"
             :key="illness.id"
             :illness="illness"
             @files-saved="onFilesSave"
      />
  </div>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Block from "@/views/Modules/Health/Components/Overview/TabIllness/Block.vue";

import {IllnessStore} from "@/scripts/Vue/Store/Module/Health/IllnessStore";

export default {
  data(): ComponentData {
    return {
      store: null,
      illnesses: [],
    }
  },
  components: {
    Block
  },
  methods: {
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
