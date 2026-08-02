<template>

  <Box>
    <div v-if="illness.appointments.length > 0"
         class="text-left"
    >
      <BoxLine>
        <span class="font-bold">{{ $t('health.overview.dataBox.appointments.label') }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{ $t('health.overview.dataBox.latest.label') }}: </span>
        <span class="value">{{ latestAppointment.date }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{ $t('health.overview.dataBox.doctor.label') }}: </span>
        <span class="value">{{ latestAppointment.doctor.name }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{ $t('health.overview.dataBox.entriesCount.label') }}: </span>
        <span class="value">{{ illness.appointments.length }}</span>
      </BoxLine>

      <br/>

      <BoxLine>
        <span class="font-bold">{{ $t('health.overview.dataBox.files.label') }}</span>
      </BoxLine>

      <BoxLine>
        <span class="label">{{ $t('health.overview.dataBox.entriesCount.label') }}: </span>
        <span class="value">{{ files.length }}</span>
      </BoxLine>

    </div>

  </Box>
</template>

<script lang="ts">
import Box     from "@/components/Ui/Containers/Components/MediumDataBlock/Components/MainContent/Box.vue";
import BoxLine from "@/components/Ui/Containers/Components/MediumDataBlock/Components/MainContent/BoxLine.vue";

import moment from "moment";

import FilesMixin from "@/views/Modules/Health/Mixin/FilesMixin.vue";

export default {
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    Box,
    BoxLine
  },
  mixins: [
    FilesMixin,
  ],
  computed: {
    /**
     * @description returns latest appointment from illness
     */
    latestAppointment(): null | Record<string, unknown> {
      let latestAppointment = null;

      for (let appointment of this.illness.appointments) {
        if (latestAppointment === null || moment(appointment.date).isAfter(latestAppointment.date)) {
          latestAppointment = appointment;
        }
      }

      return latestAppointment;
    },
  }
}
</script>
