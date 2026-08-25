<template>
  <SmallDataBlock :is-interactive="true"
                  :has-button="true"
  >
    <template #topLine>{{appointment.doctor.name}}</template>
    <template #bottomLine>{{appointment.date}}</template>
  </SmallDataBlock>
</template>

<script lang="ts">
import {SingleContact} from "@/scripts/Core/Types/Modules/Issues";
import SmallDataBlock  from "@/components/Ui/Containers/SmallDataBlock.vue";

export default {
  props: {
    appointment: {
      type: Object as SingleContact,
      required: true
    }
  },
  components: {
    SmallDataBlock
  }
}
</script>