<template>
  <SimpleTable :headers="tableHeaders"
               :data="usedTableData"
               ref="table"
               class="mt-4"
               v-if="usedTableData.length > 0"
  />

  <NoResultsText v-else />
</template>

<script lang="ts">
import TableActions     from "@/components/Ui/Actions/TableActions.vue";
import NoResultsText    from "@/components/Page/NoResultsText.vue";
import SimpleTable      from "@/components/Ui/Table/SimpleTable.vue";
import CreateUpdateForm from "@/views/Modules/Goals/Payments/CreateUpdateForm.vue";


import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {PaymentsState} from "@/scripts/Vue/Store/Module/Goals/Payments/PaymentsState";

import SymfonyGoalsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyGoalsRoutes";

export default {
  data(): ComponentData {
    return {
      paymentsStore: null as PaymentsState,
      tableHeaders: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.start.label'),
          dataValuePath : 'start.value',
          dataIsComponentPath : 'start.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.end.label'),
          dataValuePath : 'end.value',
          dataIsComponentPath : 'end.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.goal.label'),
          dataValuePath : 'goal.value',
          dataIsComponentPath : 'goal.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.collected.label'),
          dataValuePath : 'collected.value',
          dataIsComponentPath : 'collected.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.showOnDashboard.label'),
          dataValuePath : 'isForDashboard.value',
          dataRawValuePath : 'isForDashboard.rawValue',
          dataIsComponentPath : 'isForDashboard.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('goals.payments.tab.manage.table.header.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
      ],
    }
  },
  components: {
    SimpleTable,
    NoResultsText
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let singlePayment of this.paymentsStore.allEntries) {
        data.push({
          values: {
            id: {
              value: singlePayment.id,
              isComponent : false,
            },
            name: {
              value: singlePayment.name,
              isComponent: false,
            },
            start: {
              value: singlePayment.start,
              isComponent: false,
            },
            end: {
              value: singlePayment.end,
              isComponent: false,
            },
            goal: {
              value: singlePayment.goal,
              isComponent: false,
            },
            collected: {
              value: singlePayment.collected,
              isComponent: false,
            },
            isForDashboard: {
              value: this.$t(`goals.payments.tab.manage.table.header.showOnDashboard.state.${Number(singlePayment.showOnDashboard)}.label`),
              rawValue: singlePayment.showOnDashboard,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: CreateUpdateForm,
                baseUrl: SymfonyGoalsRoutes.GOAL_PAYMENTS_BASE_URL,
                store: PaymentsState,
              }
            }
          }
        })
      }

      return data;
    }
  },
  beforeMount(): void {
    this.paymentsStore = PaymentsState();
    this.paymentsStore.getAll();
  },
}
</script>