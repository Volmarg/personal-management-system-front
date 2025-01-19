<template>
  <CalendarsTable :data="tableData" />
  <AddEditForm :header="$t('calendar.settings.newEntry.header')"
               @submit="store.getAll"
  />
</template>

<script lang="ts">
import SymfonyCalendarRoutes from "@/router/SymfonyRoutes/Modules/SymfonyCalendarRoutes";

import {CalendarStore}   from "@/scripts/Vue/Store/Module/Calendar/CalendarStore";
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import AddEditForm    from "@/views/Modules/Calendar/Settings/Components/AddEditForm.vue";
import CalendarsTable from "@/views/Modules/Calendar/Settings/Components/CalendarsTable.vue";
import TableActions   from "@/components/Ui/Actions/TableActions.vue";
import ColorInfoBlock from "@/components/Ui/ColorInfoBlock.vue";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
    }
  },
  props: {
    calendarsData: {
      type: Array,
      required: true,
    }
  },
  components: {
    AddEditForm,
    CalendarsTable
  },
  computed: {
    /**
     * @description returns the data that will be used in table
     */
    tableData(): Array {
      let usedData = [];
      for (let calendar of this.calendarsData) {
        usedData.push({
          values: {
            id: {
              value: calendar.id,
              isComponent: false,
            },
            name: {
              value: calendar.name,
              isComponent: false,
            },
            color: {
              value: calendar.color,
              isComponent: false,
            },
            colorDisplay: {
              value: ColorInfoBlock,
              isComponent: true,
              componentProps : {
                colorHex: calendar.color,
              }
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyCalendarRoutes.CALENDAR_MANAGE_BASE_URL,
                store: CalendarStore,
              }
            }
          }
        })
      }

      return usedData;
    }
  },
  beforeMount(): void {
    this.store = CalendarStore();
  }
}
</script>