<template>
  <SearchInput class="transform scale-90"
               placeholder-trans-string="search.topNav.placeholder"
               @submit="onSubmit"
               v-model="searchValue"
  />
</template>

<script lang="ts">
/**
 * @description handles searching for data through all supported modules
 */
import SearchInput from "@/components/Navigation/SearchInput.vue";

import VueRouterSearch from "@/router/Modules/VueRouterSearch";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      searchValue: '',
    }
  },
  components: {
    SearchInput
  },
  computed: {
    searchRouter(): VueRouterSearch {
      return VueRouterSearch;
    }
  },
  methods: {
    /**
     * @description go to search result page, dispatch search on it and display results
     */
    onSubmit() {
      let usedSearchValue = this.searchValue.trim();
      if (!usedSearchValue) {
        return;
      }

      this.$router.push({
        path: this.searchRouter.ROUTE_PATH_SEARCH_RESULTS,
        query: {
          [this.searchRouter.ROUTE_QUERY_PARAM_QUERY]: usedSearchValue
        }
      });

      this.searchValue = '';
    }
  }
}
</script>