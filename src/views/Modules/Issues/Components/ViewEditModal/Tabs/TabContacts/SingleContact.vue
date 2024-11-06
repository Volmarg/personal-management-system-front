<template>
  <SmallDataBlock :is-interactive="true">
    <template #topLine>{{contact.date}}</template>
    <template #bottomLine>{{contact.description}}</template>
  </SmallDataBlock>
</template>

<script lang="ts">
import {SingleContact} from "@/scripts/Core/Types/Modules/Issues";
import SmallDataBlock  from "@/components/Ui/Containers/SmallDataBlock.vue";

export default {
  props: {
    contact: {
      type: Object as SingleContact,
      required: true
    }
  },
  components: {
    SmallDataBlock
  }
}
</script>