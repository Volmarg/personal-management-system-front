<template>
  <div class="mt-10">
    <div v-for="chunk in leftToSpendData"
       :key="JSON.stringify(chunk)"
       class="text-left mt-0.5"
    >
      <fa icon="caret-right" />
      <span v-html="$t('job.afterhours.tabs.summary.texts.gotForUsage', {time: chunk.time, type: chunk.type})" />
    </div>

    <div class="mb-4 mt-8">
      <p class="font-bold text-lg text-left">{{ $t('job.afterhours.tabs.summary.texts.totally.header') }}</p>
      <div class="flex flex-row">
        <fa icon="caret-right" />
        <span>{{ $t('job.afterhours.tabs.summary.texts.hours.label') }}:&nbsp;</span>
        <span class="text-left font-bold text-blue-500">{{hoursLeftToSpend}}</span>
      </div>

      <div class="flex flex-row">
        <fa icon="caret-right" />
        <span>{{ $t('job.afterhours.tabs.summary.texts.days.label') }}:&nbsp;</span>
        <span class="text-left font-bold text-blue-500">{{daysLeftToSpend}}</span>
      </div>
    </div>

    <div class="mt-10 flex flex-row text-tiny italic">
      <AsteriskRequired />
      <p v-html="$t('job.afterhours.tabs.summary.texts.disclaimer.rounding')"
         class="text-left  text-gray-500"/>
    </div>

  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AsteriskRequired from "@/components/Form/AsteriskRequired.vue";

export default {
  data(): ComponentData {
    return {
      hoursLeftToSpend: '23:04:00',
      daysLeftToSpend: '2.75',
      leftToSpendData: [
        {
          time: "08:18:00 ( 1 day/s )",
          type: "general usage"
        },
        {
          time: "06:55:00 ( 0.75 day/s )",
          type: "festival"
        },
        {
          time: "04:19:00 ( 0.5 day/s )",
          type: "holidays"
        }
      ]
    }
  },
  components: {
    AsteriskRequired,
  }
}
</script>

<style lang="scss">
.time-for-usage {
  @apply text-blue-500 font-bold
}
</style>