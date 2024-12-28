<template>
  <MultiSelect
      :label="$t('job.holidays.shared.form.year.label')"
      :options="options"
      @change="onOptionChanged"
      @select="onOptionChanged"
      @deselect="onOptionChanged"
      @clear="onOptionChanged"
      @paste="onOptionChanged"
      v-model="selectedValue"
      mode="single"
      :allow-show-options-list="true"
      :allow-create-options="false"
      :can-clear="false"
      :required="true"
  />
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {PoolsState}    from "@/scripts/Vue/Store/Module/Job/Holidays/PoolsState";

export default {
  data(): ComponentData {
    return {
      poolsStore: null as null | PoolsState,
      pools: [],
      selectOptions: [],
      selectedValue: 0,
    }
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns select options
     */
    options(): Array {
      let options = [];
      for(let pool of this.pools){
        options.push({
          label: pool.year,
          value: pool.year,
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    }
  },
  async beforeMount(): Promise<void> {
    this.poolsStore = PoolsState();
    await this.poolsStore.getAll();
    this.pools = this.poolsStore.allEntries;
  },
  watch: {
    'poolsStore.allEntries': {
      deep: true,
      handler: function () {
        this.pools = this.poolsStore.allEntries;
      }
    }
  }
}
</script>