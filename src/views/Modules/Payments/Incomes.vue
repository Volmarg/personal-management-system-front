<template>
  <Base :info-block-description="$t('payments.incomes.description')"
        :is-in-container="false"
  >
    <IncomesTable :data="tableData"
                  class="mb-6"
    />
    <NewEntry />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import NewEntry     from "@/views/Modules/Payments/Components/Incomes/NewEntry.vue";
import IncomesTable from "@/views/Modules/Payments/Components/Incomes/IncomesTable.vue";
import Base         from "@/views/Modules/Base.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        amount: null,
        information: null,
        currency: null,
      },
      tableData: [
        {
          values : {
            amount : {
              value       : "1236",
              isComponent : false,
            },
            information : {
              value       : "Salary",
              isComponent : false,
            },
            date : {
              value       : "2024-12-01",
              isComponent : false,
            },
            currency: {
              value       : "EUR",
              isComponent : false,
            }
          }
        },
        {
          values : {
            amount : {
              value       : "2354",
              isComponent : false,
            },
            information : {
              value       : "A second job",
              isComponent : false,
            },
            date : {
              value       : "2024-11-01",
              isComponent : false,
            },
            currency: {
              value       : "EUR",
              isComponent : false,
            }
          }
        },
      ]
    }
  },
  components: {
    Base,
    NewEntry,
    IncomesTable,
  }
}
</script>