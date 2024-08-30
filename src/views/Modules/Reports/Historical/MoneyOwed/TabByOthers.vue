<template>
  <div>
    <OwnageTable :data="tableData" />
  </div>
</template>

<script lang="ts">
import OwnageTable from "@/views/Modules/Reports/Historical/MoneyOwed/OwnageTable.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      tableData: [
        {
          values : {
            target : {
              value       : "target",
              isComponent : false,
            },
            amount : {
              value       : "1111",
              isComponent : false,
            },
            information : {
              value       : "information",
              isComponent : false,
            },
            date : {
              value       : "date",
              isComponent : false,
            },
            currency : {
              value       : "currency",
              isComponent : false,
            }
          }
        },
        {
          values : {
            target : {
              value       : "target",
              isComponent : false,
            },
            amount : {
              value       : "2222",
              isComponent : false,
            },
            information : {
              value       : "information",
              isComponent : false,
            },
            date : {
              value       : "date",
              isComponent : false,
            },
            currency : {
              value       : "currency",
              isComponent : false,
            }
          }
        },
        {
          values : {
            target : {
              value       : "target2",
              isComponent : false,
            },
            amount : {
              value       : "65.24",
              isComponent : false,
            },
            information : {
              value       : "information2",
              isComponent : false,
            },
            date : {
              value       : "date2",
              isComponent : false,
            },
            currency : {
              value       : "currency2",
              isComponent : false,
            }
          }
        },
      ],
    }
  },
  components: {
    OwnageTable
  }
}
</script>