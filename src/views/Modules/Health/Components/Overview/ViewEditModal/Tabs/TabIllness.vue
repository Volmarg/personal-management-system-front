<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col xl:w-1/2">
      <IllnessCreateEditForm :header="$t('health.overview.form.illness.header.update')"
                             :id="illness.id"
                             :initial-information="illness.information"
                             :initial-name="illness.name"
                             :appointment-ids="appointmentIds"
      />
    </div>
  </div>
</template>

<script lang="ts">
import IllnessCreateEditForm from "@/views/Modules/Health/Components/Common/IllnessCreateEditForm.vue";

import DoctorAppointmentMixin from "@/views/Modules/Health/Mixin/DoctorAppointmentMixin.vue";

export default {
  props: {
    illness: {
      type: Object,
      required: true,
    },
  },
  components: {
    IllnessCreateEditForm
  },
  mixins: [
    DoctorAppointmentMixin,
  ],
  computed: {
    appointmentIds(): Array<number> {
      return this.idsFromIllness(this.illness);
    }
  }
}
</script>