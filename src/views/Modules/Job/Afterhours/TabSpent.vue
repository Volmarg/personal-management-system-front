<template>
  <AfterhoursTable :afterhours="afterhours"/>
</template>

<script lang="ts">
import AfterhoursTable from "@/views/Modules/Job/Afterhours/AfterhoursTable.vue";

export default {
  props: {
    afterhours: {
      type: Array,
      required: true,
    },
  },
  components: {
    AfterhoursTable,
  },
}
</script>