<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      boundModule: {
        goals: "goals",
        issues: "issues"
      }
    }
  }
}
</script>