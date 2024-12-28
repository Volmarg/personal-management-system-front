<script lang="ts">
import {StoreDefinition} from "pinia";

import Logger             from "@/scripts/Core/Logger";
import TypeChecker        from "@/scripts/Core/Services/Types/TypeChecker";
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialisedStore: null as [null, StoreDefinition, Array<StoreDefinition>]
    }
  },
  props: {
    fetchAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    store: {
      type: [Object as StoreDefinition, null, Array],
      required: false,
      default: null,
    }
  },
  computed: {
    /**
     * @description check if the store based fetch should be used
     */
    useStoreFetch(): boolean {
      let isStoreSet = (TypeChecker.isArray(this.store) && !ArrayTypeProcessor.isEmpty(this.store) || this.store);
      return this.fetchAll && isStoreSet;
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
      if (TypeChecker.isArray(this.store)) {
        this.initialisedStore = [];
        for (let singleStore of this.store) {
          let initialisedStore = singleStore();
          this.validateSingleStore(initialisedStore);
          this.initialisedStore.push(initialisedStore);
        }
        return;
      }

      this.initialisedStore = this.store();
      this.validateSingleStore(this.initialisedStore);
    },
    /**
     * @description check if single store conf is proper
     */
    validateSingleStore(initialisedStore: StoreDefinition): void {
      if (this.useStoreFetch && !initialisedStore.getAll) {
        throw new Error("Store has no method named `getAll`")
      }

      if (this.useStoreFetch && !initialisedStore.allEntries) {
        throw new Error("Store has no property named `allEntries`")
      }
    },
    /**
     * @description fetches data from all stores
     */
    fetchStoreData(): void {
      if (TypeChecker.isArray(this.initialisedStore)) {
        for (let store of this.initialisedStore) {
          store.getAll();
        }
      } else {
        this.initialisedStore.getAll();
      }
    }
  },
}
</script>