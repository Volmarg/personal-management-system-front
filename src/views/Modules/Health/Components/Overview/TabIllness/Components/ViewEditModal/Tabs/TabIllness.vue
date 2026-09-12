<template>
  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col xl:w-1/2">
      <IllnessCreateEditForm :header="formHeader"
                             :id="illness?.id"
                             :initial-information="illness?.information"
                             :initial-name="illness?.name"
                             :appointment-ids="appointmentIds"
                             @close-modal="$emit('closeModal', $event)"
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
      type: [Object, null],
      required: true,
    },
  },
  components: {
    IllnessCreateEditForm
  },
  mixins: [
    DoctorAppointmentMixin,
  ],
  emits: [
    'closeModal',
  ],
  computed: {
    /**
     * @description get form header
     */
    formHeader(): string {
      if (this?.illness?.id) {
        return this.$t('health.overview.form.illness.header.update');
      }

      return this.$t('health.overview.form.illness.header.add');
    },
    /**
     * @description get illness appointment ids
     */
    appointmentIds(): Array<number> {
      if (!this.illness) {
        return [];
      }

      return this.idsFromIllness(this.illness);
    }
  }
}
</script>