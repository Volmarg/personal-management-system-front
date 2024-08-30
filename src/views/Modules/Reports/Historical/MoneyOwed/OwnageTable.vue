<template>
  <div class="filter">
    <h2 class="header">{{ $t('reports.historical.moneyOwed.tabs.shared.filter.header') }}</h2>
    <TargetSelect :options="targetSelectOptions"
                  v-model="targetFilter"
                  class="target-select"
    />
  </div>
  <SimpleTable :headers="headers"
               :data="usedData"
               ref="table"
               v-if="data.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import TargetSelect  from "@/views/Modules/Reports/Historical/MoneyOwed/TargetSelect.vue";
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      targetFilter: null,
      targetSelectOptions: [],
      headers: [
        {
          label: this.$t('reports.historical.moneyOwed.tabs.shared.table.headers.target.label'),
          dataValuePath : 'target.value',
          dataIsComponentPath : 'target.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('reports.historical.moneyOwed.tabs.shared.table.headers.amount.label'),
          dataValuePath : 'amount.value',
          dataIsComponentPath : 'amount.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('reports.historical.moneyOwed.tabs.shared.table.headers.information.label'),
          dataValuePath : 'information.value',
          dataIsComponentPath : 'information.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('reports.historical.moneyOwed.tabs.shared.table.headers.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('reports.historical.moneyOwed.tabs.shared.table.headers.currency.label'),
          dataValuePath : 'currency.value',
          dataIsComponentPath : 'currency.isComponent',
          dataComponentPropertiesPath: null
        },
      ],
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    NoResultsText,
    TargetSelect,
    SimpleTable
  },
  computed: {
    /**
     * @description returns the data that will be used in table
     */
    usedData(): Array {
      let usedData = [];
      for (let dataChunk of this.data) {
        if (this.targetFilter && dataChunk.values.target.value !== this.targetFilter) {
          continue;
        }

        usedData.push(dataChunk);
      }

      return usedData;
    },
  },
  methods: {

    /**
     * @description returns array of options for the target select filter
     */
    setTargetSelectOptions(): Array<Record<string, string>> {
      let options = [];
      let added = [];
      for (let dataChunk of this.usedData) {
        let value = dataChunk.values.target.value;

        if (this.targetFilter && dataChunk.values.target.value !== this.targetFilter) {
          continue;
        }

        if (added.includes(value)) {
          continue;
        }

        added.push(value)
        options.push({
          label: StringTypeProcessor.ucFirst(value),
          value: value
        })
      }

      this.targetSelectOptions = options;
    }
  },
  mounted(): void {
    this.setTargetSelectOptions();
  },
  watch: {
    targetFilter(): void {
      this.$refs.table.refresh();
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  .header {
    @apply text-left text-xl mb-2
  }

  .target-select {
    @apply lg:w-1/5 md:w-1/2
  }

  @apply flex justify-start mb-2 mt-10 mr-4 flex-col
}
</style>