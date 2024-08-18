<script lang="ts">
import EnvReader from "@/scripts/Core/System/EnvReader";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isDemo: false,
    }
  },
  mounted(): void {
    this.isDemo = EnvReader.isDemo();
  }
}
</script>