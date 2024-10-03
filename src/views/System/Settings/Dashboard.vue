<template>
  <div class="mt-10">
    <h2 class="text-lg">{{ $t('systemSettings.tab.dashboard.widgetHeader') }}</h2>
    <SimpleTable :headers="headers"
                 :data="data"
                 ref="table"
                 v-if="data.length > 0"
                 :id="dashboardWidgetsTableId"
                 @component-value-change="onComponentValueChange"
    />
  </div>
</template>

<script lang="ts">
import SimpleTable   from "@/components/Ui/Table/SimpleTable.vue";
import ColoredSwitch from "@/components/Ui/ColoredSwitch.vue";

import DashboardMixin from "@/mixins/DashboardMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  data(): ComponentData {
    return {
      dashboardWidgetsTableId: 'dashboardWidgets',
      headers: [
        {
          label: 'id',
          isVisible: false,
          dataValuePath : 'id.value',
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('systemSettings.tab.dashboard.table.headers.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('systemSettings.tab.dashboard.table.headers.displayWidget.label'),
          dataValuePath : 'displayWidget.value',
          dataIsComponentPath : 'displayWidget.isComponent',
          dataComponentPropertiesPath: 'displayWidget.componentProps'
        },
      ],
    }
  },
  components: {
    SimpleTable
  },
  mixins: [
    DashboardMixin,
  ],
  computed: {
    data(): Array {
      return [
        {
          values : {
            id: {
              value: this.widget.goalsProgress,
              isComponent : false,
              isVisible: false,
            },
            name : {
              value       : this.$t('systemSettings.tab.dashboard.widgetToName.' + this.widget.goalsProgress),
              isComponent : false,
              componentProps: {}
            },
            displayWidget : {
              value          : ColoredSwitch,
              isComponent    : true,
              componentProps : {}
            },
          }
        },
        {
          values : {
            id: {
              value: this.widget.goalsPayments,
              isComponent : false,
              isVisible: false,
            },
            name : {
              value       : this.$t('systemSettings.tab.dashboard.widgetToName.' + this.widget.goalsPayments),
              isComponent : false,
            },
            displayWidget : {
              value          : ColoredSwitch,
              isComponent    : true,
              componentProps : {}
            },
          }
        }
      ]
    }
  },
  methods: {
    /**
     * @description reacts on table component value change, dispatches the handling further
     */
    onComponentValueChange(data: Record) {
      if (data.tableId == this.dashboardWidgetsTableId) {
        this.onWidgetVisibilityChange(data);
      }
    },
    /**
     * @description handles dashboard widget visibility change, updates the visibility state
     */
    onWidgetVisibilityChange(data: Record): void {
      let widgetName = null;
      for (let rowData of data.rowData) {
        if (rowData.fieldName === "id") {
          widgetName = rowData.value
          break;
        }
      }

      if (!widgetName) {
        throw BaseError("Could not obtain widget name!");
      }

      let widgetState = {
        widgetName: widgetName,
        isVisible: data.value,
      };

      // todo: implement backend call, at least this is how it's solved in code atm.
    }
  }
}
</script>