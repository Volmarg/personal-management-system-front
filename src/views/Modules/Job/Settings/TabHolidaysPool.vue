<template>
  <PoolsTable :table-data="tableData" />
  <AddEditForm :header="$t('job.settings.tabs.managePool.header')"
               @submit="onNewSubmit"
  />
</template>

<script lang="ts">
import PoolsTable   from "@/views/Modules/Job/Settings/ManageHolidaysPool/PoolsTable.vue";
import AddEditForm  from "@/views/Modules/Job/Settings/ManageHolidaysPool/AddEditForm.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";
import SymfonyJobRoutes from "@/router/SymfonyRoutes/Modules/SymfonyJobRoutes";
import {PoolsState}     from "@/scripts/Vue/Store/Module/Job/Holidays/PoolsState";

export default {
  data(): ComponentData {
    return {
      poolsStore: null as null | PoolsState,
      pools: [],
    }
  },
  components: {
    AddEditForm,
    PoolsTable
  },
  computed: {
    /**
     * @description returns array with structure used by pools table
     */
    tableData(): Array {
      let data = [];
      for (let pool of this.pools) {
        data.push({
          values: {
            id: {
              value: pool.id,
              isComponent: false,
            },
            year: {
              value: pool.year,
              isComponent: false,
            },
            days: {
              value: pool.days,
              isComponent: false,
            },
            companyName: {
              value: pool.companyName,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyJobRoutes.SETTINGS_HOLIDAYS_POOL_BASE_URL,
                store: PoolsState,
              }
            }
          }
        })
      }

      return data;
    }
  },
  methods: {
    /**
     * @description refreshes store state and the page content
     */
    async getPools(): Promise<void> {
      await this.poolsStore.getAll();
      this.pools = this.poolsStore.allEntries;
    },
    /**
     * @description will refresh the page state when form is submitted
     */
    onNewSubmit(): void {
      this.getPools();
    },
  },
  beforeMount(): void {
    this.poolsStore = PoolsState();
    this.getPools();
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
