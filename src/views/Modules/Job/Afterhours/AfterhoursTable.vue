<template>
  <SimpleTable :headers="headers"
               :data="usedData"
               ref="table"
               v-if="usedData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";
import TableActions  from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm   from "@/views/Modules/Job/Afterhours/AddEditForm.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import SymfonyJobRoutes  from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";
import {AfterhoursState} from "@/scripts/Vue/Store/Module/Job/Afterhours/AfterhoursState";

export default {
  data(): ComponentData {
    return {
      targetSelectOptions: [],
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: 'type',
          dataValuePath : 'type.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.afterhours.shared.table.headers.date.label'),
          dataValuePath : 'date.value',
          dataIsComponentPath : 'date.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.afterhours.shared.table.headers.description.label'),
          dataValuePath : 'description.value',
          dataIsComponentPath : 'description.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.afterhours.shared.table.headers.minutes.label'),
          dataValuePath : 'minutes.value',
          dataIsComponentPath : 'minutes.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.afterhours.shared.table.headers.goal.label'),
          dataValuePath : 'goal.value',
          dataIsComponentPath : 'goal.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('job.afterhours.shared.table.headers.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
      ],
    }
  },
  props: {
    afterhours: {
      type: Array,
      required: true,
    },
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
      for (let afterhour of this.afterhours) {
        usedData.push({
          values: {
            id: {
              value: afterhour.id,
              isComponent: false,
            },
            type: {
              value: afterhour.type,
              isComponent: false,
            },
            date: {
              value: afterhour.date,
              isComponent: false,
            },
            description: {
              value: afterhour.description,
              isComponent: false,
            },
            minutes: {
              value: afterhour.minutes,
              isComponent: false,
            },
            goal: {
              value: afterhour.goal,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyJobRoutes.AFTERHOURS_BASE_URL,
                store: AfterhoursState,
              }
            }
          }
        })
      }

      return usedData;
    },
  },
}
</script>
