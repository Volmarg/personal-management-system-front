<template>
  <SimpleTable :headers="headers"
               :data="usedData"
               ref="table"
               class="mt-4"
               v-if="data.length > 0"
  />
  <NoResultsText v-else />
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      allYears: [],
      yearFilter: null,
      headers: [
        {
          label: this.$t('payments.monthly.table.headers.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.monthly.table.headers.money.label'),
          dataValuePath : 'money.value',
          dataIsComponentPath : 'money.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.monthly.table.headers.description.label'),
          dataValuePath : 'description.value',
          dataIsComponentPath : 'description.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.monthly.table.headers.type.label'),
          dataValuePath : 'type.value',
          dataIsComponentPath : 'type.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.monthly.table.headers.actions.label'),
          dataValuePath : null,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        }
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
    SimpleTable
  },
  computed: {
    /**
     * @description returns the data that will be used in table
     */
    usedData(): Array {
      let usedData = [];
      for (let dataChunk of this.data) {
        if (this.yearFilter && dataChunk.values.year.value != this.yearFilter) {
          continue;
        }

        usedData.push(dataChunk);
      }

      return usedData;
    },
  },
}
</script>
