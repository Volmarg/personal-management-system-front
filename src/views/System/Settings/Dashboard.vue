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
import WidgetName    from "@/views/System/Settings/Dashboard/Component/WidgetName.vue";

import DashboardMixin from "@/mixins/DashboardMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SymfonySystemRoutes     from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

export default {
  data(): ComponentData {
    return {
      dashboardWidgetsTableId: 'dashboardWidgets',
      widgets: [],
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
          dataComponentPropertiesPath: 'name.componentProps',
          dataComponentModelValuePath: 'name.componentModelValue'
        },
        {
          label: this.$t('systemSettings.tab.dashboard.table.headers.displayWidget.label'),
          dataValuePath : 'displayWidget.value',
          dataIsComponentPath : 'displayWidget.isComponent',
          dataComponentPropertiesPath: 'displayWidget.componentProps',
          dataComponentModelValuePath: 'displayWidget.componentModelValue'
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
      let rows = [];
      for (let widgetData of this.widgets) {
        rows.push({
          values : {
            id: {
              value: widgetData.name,
              isComponent : false,
              isVisible: false,
            },
            name : {
              value: WidgetName,
              isComponent: true,
              componentProps: {
                name: this.$t('systemSettings.tab.dashboard.widgetToName.' + widgetData.name),
                isLocked: widgetData.isModuleLocked,
              },
            },
            displayWidget : {
              value          : ColoredSwitch,
              isComponent    : true,
              componentModelValue : widgetData.enabled,
              componentProps: {},
            },
          }
        })
      }

      return rows;
    }
  },
  methods: {
    /**
     * @description reacts on table component value change, dispatches the handling further
     */
    onComponentValueChange(data: Record) {
      if (data.tableId == this.dashboardWidgetsTableId) {
        this.onWidgetVisibilityChange();
      }
    },
    /**
     * @description handles dashboard widget visibility change, updates the visibility state
     *              Sending all widgets at once, because this is how the legacy code on backend works like
     */
    async onWidgetVisibilityChange(): Promise<void> {
      let widgets = [];
      for (let idx in this.$refs.table.data) {
        widgets.push({
          name: this.$refs.table.data[idx].values.id.value,
          enabled: this.$refs.table.$refs[`componentidx${idx}2`][0].isActive,
        });
      }

      let dataBag = {
        widgets: widgets
      };

      let config = new BackendModuleCallConfig(SymfonySystemRoutes.SETTINGS_DASHBOARD_WIDGET_VISIBILITY_BASE, null, BaseApiResponse, dataBag);
      config.reload = false;

      await this.$moduleCall.update(config);
      this.fetchWidgets();
    },
    /**
     * @description fetches all the widgets data
     */
    async fetchWidgets(): Promise<void> {
      this.widgets = await this.$moduleCall.getAll(SymfonySystemRoutes.SETTINGS_DASHBOARD_WIDGET_VISIBILITY_BASE);
    }
  },
  beforeMount(): void {
    this.fetchWidgets();
  }
}
</script>