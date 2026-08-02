<script lang="ts">
import PublicFolderService from "@/scripts/Core/Services/PublicFolder/PublicFolderService";

export default {
  computed: {
    /**
     * @description extracts the files available for illness
     */
    files(): Array<Record<string, string>> {
      let files = [];

      this.illness.appointments.forEach(function (appointment: Record<string, unknown>) {
        appointment.storageFiles.forEach(function(file){
          files.push({
            fileNameWithExt: file.fileNameWithExtension,
            path: PublicFolderService.buildUrl(file.filePath, true),
            id: file.id,
            appointmentId: appointment.id,
            appointmentLabel: `${appointment.doctor.name} (${appointment.date})`,
          });
        })
      })

      return files;
    }
  }
}
</script>