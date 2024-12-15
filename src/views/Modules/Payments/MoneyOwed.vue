<template>
  <Base :info-block-description="$t('payments.moneyOwed.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>

  <Container>
    <AddEditForm :header="$t('payments.moneyOwed.newForm.header')"
                 @submit="refreshPageState"
    />
  </Container>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Base           from "@/views/Modules/Base.vue";
import Tabs           from "@/components/Navigation/Tabs/Tabs.vue";
import Tab            from "@/views/Modules/Payments/Components/MoneyOwed/TabTable.vue";
import TabSummary     from "@/views/Modules/Payments/Components/MoneyOwed/TabSummary.vue";
import Container      from "@/components/Ui/Containers/Container.vue";
import AddEditForm    from "@/views/Modules/Payments/Components/MoneyOwed/AddEditForm.vue";
import TableActions   from "@/components/Ui/Actions/TableActions.vue";

import {OwedState}           from "@/scripts/Vue/Store/Module/Payments/MoneyOwed/OwedState";
import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      store: null as null | OwedState,
      owedData: [],
    }
  },
  components: {
    AddEditForm,
    Container,
    Tabs,
    Base
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    tableData(): Array {
      let data = [];
      for (let entry of this.owedData) {
        data.push({
          values: {
            id: {
              value: entry.id,
              isComponent : false,
            },
            target: {
              value: entry.target,
              isComponent : false,
            },
            amount: {
              value: entry.amount,
              isComponent: false,
            },
            information: {
              value: entry.information,
              isComponent: false,
            },
            date: {
              value: entry.date,
              isComponent: false,
            },
            owedByMe: {
              value: this.$t(`generic.bool.yesNo.${Number(entry.owedByMe)}`),
              rawValue: entry.owedByMe,
              isComponent: false,
            },
            currency: {
              value: entry.currency,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.MONEY_OWED_BASE_URL,
                store: OwedState,
              }
            }
          }
        })
      }

      return data;
    },
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.moneyOwed.tabs.byOthers.label'),
          tabComponent: Tab,
          tabComponentProps: {
            data: this.tableData.filter(dataChunk => !dataChunk.values.owedByMe.rawValue)
          }
        },
        {
          tabName: this.$t('payments.moneyOwed.tabs.byMe.label'),
          tabComponent: Tab,
          tabComponentProps: {
            data: this.tableData.filter(dataChunk => dataChunk.values.owedByMe.rawValue)
          }
        },
        {
          tabName: this.$t('payments.moneyOwed.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {
            data: this.tableData
          }
        },
      ];
    }
  },
  methods: {
    /**
     * @description fetches data from db and updates the page state
     */
    async refreshPageState(): Promise<void> {
      await this.store.getAll();
      this.owedData = this.store.allEntries;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = OwedState();
    this.refreshPageState();
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function(): void {
        this.owedData = this.store.allEntries;
      }
    }
  }
}
</script>