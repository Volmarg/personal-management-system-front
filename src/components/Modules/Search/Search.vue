<template>
  <SearchInput class="transform scale-90"
               :class="{
                  'force-full': isForcedFull,
               }"
               placeholder-trans-string="search.topNav.placeholder"
               @submit="onSubmit"
               @focusin="isFocused = true"
               @focusout="isFocused = false"
               v-model="searchValue"
  />
</template>

<script lang="ts">
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

/**
 * @description handles searching for data through all supported modules
 */
import SearchInput from "@/components/Navigation/SearchInput.vue";

import VueRouterSearch from "@/router/Modules/VueRouterSearch";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isFocused: false,
      searchValue: '',
    }
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  components: {
    SearchInput,
  },
  computed: {
    searchRouter(): VueRouterSearch {
      return VueRouterSearch;
    },
    /**
     * @description decide if the search input should be forced full width
     */
    isForcedFull(): boolean {
      if (this.isFocused && this.isPhoneBreakingPoint) {
        return true;
      }

      return false;
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
    }
  }
}
</script>

<style lang="scss" scoped>
.force-full {
  width: 600px;
  position: absolute;
  z-index: 30;
  transition: all 3s ease;
  left: 40px;
}
</style>