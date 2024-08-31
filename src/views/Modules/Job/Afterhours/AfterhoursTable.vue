<template>
  <SimpleTable :headers="headers"
               :data="usedData"
               ref="table"
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
      targetFilter: null,
      targetSelectOptions: [],
      headers: [
        {
          label: this.$t('afterhours.shared.table.headers.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('afterhours.shared.table.headers.description.label'),
          dataValuePath : 'description.value',
          dataIsComponentPath : 'description.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('afterhours.shared.table.headers.minutes.label'),
          dataValuePath : 'minutes.value',
          dataIsComponentPath : 'minutes.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('afterhours.shared.table.headers.goal.label'),
          dataValuePath : 'goal.value',
          dataIsComponentPath : 'goal.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('afterhours.shared.table.headers.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
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
}
</script>
