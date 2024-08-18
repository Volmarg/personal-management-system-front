<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import EnvReader from "@/scripts/Core/System/EnvReader";

export default {
  data(): ComponentData {
    return {
      profilerUri: '/_profiler/empty/search/results?limit=10',
    }
  },
  computed: {
    /**
     * @description returns the absolute url to the symfony profiler
     */
    absoluteProfilerUrl(): string {
      return EnvReader.getBackendBaseUrl() + this.profilerUri;
    }
  }
}
</script>