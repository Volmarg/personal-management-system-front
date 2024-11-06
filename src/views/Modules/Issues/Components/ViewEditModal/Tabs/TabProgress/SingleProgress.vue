<template>
  <SmallDataBlock :is-interactive="true">
    <template #topLine>{{progress.date}}</template>
    <template #bottomLine><div v-html="progress.description" /> </template>
  </SmallDataBlock>
</template>

<script lang="ts">
import {SingleProgress} from "@/scripts/Core/Types/Modules/Issues";
import SmallDataBlock   from "@/components/Ui/Containers/SmallDataBlock.vue";

export default {
  props: {
    progress: {
      type: Object as SingleProgress,
      required: true
    }
  },
  components: {
    SmallDataBlock
  }
}
</script>