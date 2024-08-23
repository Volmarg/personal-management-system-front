<template>
  <div class="box-content">
    <div v-if="showContactsData"
         class="text-left"
    >
      <p class="box-line">
        <span class="font-bold">{{$t('issues.pending.box.dashboard.lines.contactHeader')}}</span>
      </p>
      <p class="box-line">
        <span class="label">{{$t('issues.pending.box.dashboard.lines.lastTry')}}: </span>
        <span class="value">{{ lastContactDate }}</span>
      </p>
      <p class="box-line">
        <span class="label">{{$t('issues.pending.box.dashboard.lines.entriesCount')}}: </span>
        <span class="value">{{ contactEntriesCount }}</span>
      </p>
    </div>

    <br>

    <div v-if="showProgressData"
         class="text-left"
    >
      <p class="box-line">
        <span class="font-bold">{{$t('issues.pending.box.dashboard.lines.progressHeader')}}</span>
      </p>
      <p class="box-line">
        <span class="label">{{$t('issues.pending.box.dashboard.lines.lastTry')}}: </span>
        <span class="value">{{ lastProgressDate }}</span>
      </p>
      <p class="box-line">
        <span class="label">{{$t('issues.pending.box.dashboard.lines.entriesCount')}}: </span>
        <span class="value">{{ progressEntriesCount }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    lastContactDate: {
      type: [String, null],
      required: true,
    },
    lastProgressDate: {
      type: [String, null],
      required: true,
    },
    contactEntriesCount: {
      type: Number,
      required: true,
    },
    progressEntriesCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    /**
     * @description decides if contact data should be shown
     */
    showContactsData(): boolean {
      return this.contactEntriesCount > 0;
    },
    /**
     * @description decides if progress data should be shown
     */
    showProgressData(): boolean {
      return this.progressEntriesCount > 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  min-height: 150px;
  @apply flex flex-col w-full
}

.box-line {
  .label {
    @apply text-gray-800
  }
  .value {
    @apply text-gray-600
  }
  @apply self-start
}
</style>