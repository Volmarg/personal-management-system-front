<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      widget: {
        schedules: "schedules",
        goalsProgress: "goalsProgress",
        goalsPayments: "goalsPayments",
        pendingIssues: "pendingIssues"
      },
      notification: {
        webhook: "webhook",
        email: "email"
      }
    }
  }
}
</script>