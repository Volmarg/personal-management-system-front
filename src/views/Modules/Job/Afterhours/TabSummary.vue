<template>
  <div class="mt-10">
    <div v-for="(formattedText, goal) in sumPerGoal"
       :key="goal + formattedText"
       class="text-left mt-0.5"
    >
      <fa icon="caret-right" />
      <span v-html="$t('job.afterhours.tabs.summary.texts.gotForUsage', {time: formattedText, goal: goal})" />
    </div>

    <div class="mb-4 mt-8">
      <p class="font-bold text-lg text-left">{{ $t('job.afterhours.tabs.summary.texts.totally.header') }}</p>
      <div class="flex flex-row">
        <fa icon="caret-right" />
        <span>{{ $t('job.afterhours.tabs.summary.texts.hours.label') }}:&nbsp;</span>
        <span class="text-left font-bold text-blue-500">{{humanReadableTime}}</span>
      </div>

      <div class="flex flex-row">
        <fa icon="caret-right" />
        <span>{{ daysLabel }}:&nbsp;</span>
        <span class="text-left font-bold text-blue-500">{{humanReadableDays}}</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      workDayHours: 8,
    }
  },
  computed: {
    /**
     * @description returns the days label
     */
    daysLabel(): string {
      return StringTypeProcessor.ucFirst(this.$t('job.afterhours.tabs.summary.texts.days.label'));
    },
    /**
     * @description returns the summary of minutes made / spent grouped by goals, in an easy human-friendly format
     */
    sumPerGoal(): Record {
      let sums = {};
      for (let afterhour of this.afterhours) {
        let usedGoal = (afterhour.goal ? afterhour.goal : this.$t('job.afterhours.tabs.summary.texts.generalUsage'));

        if (!sums[usedGoal]) {
          sums[usedGoal] = 0;
        }

        if ("spent" == afterhour.type) {
          sums[usedGoal] -= afterhour.minutes;
          continue;
        }

        sums[usedGoal] += afterhour.minutes;
      }

      let humanReadableFormats = {};
      for (let goal in sums) {
        let minutes = sums[goal];
        let hours = parseInt(minutes / 60);
        let min = Math.abs(minutes % 60);
        let days = (minutes / 60 / this.workDayHours).toFixed(2)

        humanReadableFormats[goal] = `${hours}h ${min}min (${days} ${this.$t('job.afterhours.tabs.summary.texts.days.label')})`
      }

      return humanReadableFormats;
    },
    /**
     * @description summed afterhour minutes
     */
    totalMinutes(): number {
      let allMinutes = 0;
      for (let afterhour of this.afterhours) {
        if ("spent" == afterhour.type) {
          allMinutes -= afterhour.minutes;
          continue;
        }

        allMinutes += afterhour.minutes;
      }

      return allMinutes.toFixed(2);
    },
    /**
     * @description human readable hours / minutes
     */
    humanReadableTime(): number {
      let hours = parseInt(this.totalMinutes / 60);
      let min = Math.abs(this.totalMinutes % 60);

      return `${hours}h ${min}min`;
    },
    /**
     * @description human readable days
     */
    humanReadableDays(): number {
      return parseInt(this.totalMinutes / 60 / this.workDayHours).toFixed(2);
    },
  },
  props: {
    afterhours: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.time-for-usage {
  @apply text-blue-500 font-bold
}
</style>