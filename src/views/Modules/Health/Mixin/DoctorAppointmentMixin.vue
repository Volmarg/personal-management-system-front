<script lang="ts">
import SymfonyHealthRoutes from "@/router/SymfonyRoutes/Modules/SymfonyHealthRoutes";
import BaseApiResponse     from "@/scripts/Response/BaseApiResponse";

import {AppointmentFilesSaveData} from "@/scripts/Core/Types/Modules/Health";

import ResponseHandlerMixin from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

export default {
  mixins: [
    ResponseHandlerMixin
  ],
  methods: {
    /**
     * @description extract ids of appointments assigned to current illness
     */
    idsFromIllness(illness: Record<string, string | number | Array<string|number>>): Array<number> {
      return illness.appointments.map((appointment: Record<string, string|number>) => appointment.id);
    },
    /**
     * @description saves the appointment files in the DB
     *              keep in mind that this supports saving files for multiple appointments - for same illness!
     */
    saveFiles(data: AppointmentFilesSaveData, illnessId: number): boolean {

      let requestBag = {
        illnessId: illnessId,
        appointmentsData: data,
      }

      let url = SymfonyHealthRoutes.buildUrl(SymfonyHealthRoutes.HEALTH_DOCTOR_APPOINTMENT_SAVE_FILES_URL);

      this.$rootEvent.showFullPageLoader();
      return this.$axios.patch(url, requestBag, BaseApiResponse).then((response: BaseApiResponse) => {
        this.$rootEvent.hideFullPageLoader();
        return this.handleResponse(response, url);
      })
    }
  }
}
</script>