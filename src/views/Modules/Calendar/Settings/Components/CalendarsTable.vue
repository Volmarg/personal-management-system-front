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
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: 'color',
          dataValuePath : 'color.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('calendar.settings.table.headers.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('calendar.settings.table.headers.color.label'),
          dataValuePath : 'colorDisplay.value',
          dataIsComponentPath : 'colorDisplay.isComponent',
          dataComponentPropertiesPath: 'colorDisplay.componentProps'
        },
        {
          label: this.$t('calendar.settings.table.headers.actions.label'),
          dataValuePath : "actions.value",
          dataIsComponentPath : "actions.isComponent",
          dataComponentPropertiesPath: "actions.componentProps"
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
