<script lang="ts">
import {StoreDefinition} from "pinia";

import Logger from "@/scripts/Core/Logger";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialisedStore: null as [null, StoreDefinition]
    }
  },
  props: {
    fetchAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    store: {
      type: [Object as StoreDefinition, null],
      required: false,
      default: null,
    }
  },
  computed: {
    /**
     * @description check if the store based fetch should be used
     */
    useStoreFetch(): boolean {
      return this.fetchAll && this.store;
    }
  },
  methods: {
    /**
     * @description check the state of configuration for store based fetch
     */
    validateStoreFetchConf(): void {
      if (!this.useStoreFetch) {
        Logger.error("Re-fetching for delete is not possible with current configuration!", {
          fetchAll: this.fetchAll,
          store: this.store,
        });
      }

      this.initialisedStore = this.store();
      if (this.useStoreFetch && !this.initialisedStore.getAll) {
        throw new Error("Store has no method named `getAll`")
      }

      if (this.useStoreFetch && !this.initialisedStore.allEntries) {
        throw new Error("Store has no property named `allEntries`")
      }
    },
  }
}
</script>