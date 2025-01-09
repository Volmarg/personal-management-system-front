<template>
  <div class="flex flex-col justify-end"
       v-if="years.length > 0"
  >
    <div>
      <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('payments.monthly.filter.label') }}</h2>
    </div>

    <div class="w-full flex justify-end">
      <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/6">
        <YearSelect :years="years"
                    :allow-all-option="true"
                    v-model="selectedYear"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import YearSelect from "@/components/Form/YearSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectedYear: null,
    }
  },
  props: {
    preselectedYear: {
      type: [String, null],
      required: false,
      default: null,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  emits: [
    "yearFilterChange",
  ],
  components: {
    YearSelect
  },
  computed: {
    years(): Array<number> {
      return Object.keys(this.data);
    }
  },
  beforeMount(): void {
    this.selectedYear = this.preselectedYear;
  },
  watch: {
    selectedYear(): void {
      this.$emit('yearFilterChange', this.selectedYear);
    },
    preselectedYear(): void {
      this.selectedYear = this.preselectedYear;
    }
  }
}
</script>