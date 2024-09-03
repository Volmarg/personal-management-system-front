<script lang="ts">
import {pageStateStore} from "@/scripts/Vue/Store/PageStateStore";

export default {
  unmounted(): void {
    pageStateStore().pageTitlePostfix = '';
  }
}
</script>