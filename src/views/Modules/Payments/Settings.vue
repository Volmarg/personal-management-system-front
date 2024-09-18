<template>
  <Base :info-block-description="$t('payments.settings.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Base from "@/views/Modules/Base.vue";
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";

import TabRecurringPayments from "@/views/Modules/Payments/Components/Settings/TabRecurringPayments.vue";
import TabPaymentTypes      from "@/views/Modules/Payments/Components/Settings/TabPaymentTypes.vue";
import TabOther             from "@/views/Modules/Payments/Components/Settings/TabOther.vue";

export default {
  data(): ComponentData {
    return {
      recurringPaymentsTableData: [
        {
          values: {
            id: {
              value: 1,
              isComponent: false,
            },
            dayOfMonth: {
              value: "Phone",
              isComponent: false,
            },
            money: {
              value: "22.30",
              isComponent: false,
            },
            description: {
              value: "O2",
              isComponent: false,
            },
            type: {
              value: "Monthly Payments",
              isComponent: false,
            },
          }
        },
        {
          values: {
            id: {
              value: 2,
              isComponent: false,
            },
            dayOfMonth: {
              value: "TV",
              isComponent: false,
            },
            money: {
              value: "11.11",
              isComponent: false,
            },
            description: {
              value: "Netflix",
              isComponent: false,
            },
            type: {
              value: "Monthly Payments",
              isComponent: false,
            },
          }
        }
      ],
      paymentTypesTableData: [
        {
          values: {
            id: {
              value: 1,
              isComponent: false,
            },
            name: {
              value: "Monthly payments",
              isComponent: false,
            },
          }
        },
        {
          values: {
            id: {
              value: 2,
              isComponent: false,
            },
            name: {
              value: "Personal",
              isComponent: false,
            },
          }
        }
      ],
    }
  },
  components: {
    Tabs,
    Base
  },
  computed: {
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.settings.tab.recurringPayments.header'),
          tabComponent: TabRecurringPayments,
          tabComponentProps: {
            data: this.recurringPaymentsTableData,
            paymentTypesData: this.paymentTypesTableData,
          }
        },
        {
          tabName: this.$t('payments.settings.tab.paymentTypes.header'),
          tabComponent: TabPaymentTypes,
          tabComponentProps: {
            data: this.paymentTypesTableData
          }
        },
        {
          tabName: this.$t('payments.settings.tab.other.header'),
          tabComponent: TabOther,
        },
      ];
    }
  }
}
</script>