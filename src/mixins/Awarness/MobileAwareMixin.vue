<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import BrowserDetection from "@/scripts/Core/Services/View/BrowserDetection";

export default {
  data(): ComponentData {
    return {
      isMobileBrowser: BrowserDetection.isMobileBrowser(),
    }
  },
}
</script>