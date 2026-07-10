<template>
  <Box>
    <div v-if="showContactsData"
         class="text-left"
    >
      <BoxLine>
        <span class="font-bold">{{$t('issues.pending.box.dashboard.lines.contactHeader')}}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{$t('issues.pending.box.dashboard.lines.lastTry')}}: </span>
        <span class="value">{{ lastContactDate }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{$t('issues.pending.box.dashboard.lines.entriesCount')}}: </span>
        <span class="value">{{ contactEntriesCount }}</span>
      </BoxLine>
    </div>

    <br>

    <div v-if="showProgressData"
         class="text-left"
    >
      <BoxLine>
        <span class="font-bold">{{$t('issues.pending.box.dashboard.lines.progressHeader')}}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{$t('issues.pending.box.dashboard.lines.lastTry')}}: </span>
        <span class="value">{{ lastProgressDate }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{$t('issues.pending.box.dashboard.lines.entriesCount')}}: </span>
        <span class="value">{{ progressEntriesCount }}</span>
      </BoxLine>
    </div>
  </Box>
</template>

<script lang="ts">
import Box     from "@/components/Ui/Containers/Components/MediumDataBlock/Components/MainContent/Box.vue";
import BoxLine from "@/components/Ui/Containers/Components/MediumDataBlock/Components/MainContent/BoxLine.vue";

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
  components: {
    Box,
    BoxLine
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
