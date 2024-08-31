<template>
  <AfterhoursTable :data="usedData"/>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AfterhoursTable from "@/views/Modules/Job/Afterhours/AfterhoursTable.vue";

export default {
  data(): ComponentData {
    return {
      table: {
        data: [
          {
            values : {
              date : {
                value       : "2024.03.06",
                isComponent : false,
              },
              description : {
                value       : "Visiting Joe",
                isComponent : false,
              },
              minutes : {
                value       : "12",
                isComponent : false,
              },
              goal : {
                value       : "visiting friends",
                isComponent : false,
              },
              actions : {
                value       : "A1",
                isComponent : false,
              }
            }
          },
          {
            values : {
              date : {
                value       : "2025.03.06",
                isComponent : false,
              },
              description : {
                value       : "Doctor",
                isComponent : false,
              },
              minutes : {
                value       : "22",
                isComponent : false,
              },
              goal : {
                value       : "",
                isComponent : false,
              },
              actions : {
                value       : "A2",
                isComponent : false,
              }
            }
          },
          {
            values : {
              date : {
                value       : "2025.03.06",
                isComponent : false,
              },
              description : {
                value       : "Car fixes",
                isComponent : false,
              },
              minutes : {
                value       : "50",
                isComponent : false,
              },
              goal : {
                value       : "",
                isComponent : false,
              },
              actions : {
                value       : "A3",
                isComponent : false,
              }
            }
          },
        ]
      }
    }
  },
  components: {
    AfterhoursTable,
  },
  computed: {
    /**
     * @description returns the data used in table after it's filtered etc.
     */
    usedData(): Array {
      return this.table.data;
    }
  }
}
</script>