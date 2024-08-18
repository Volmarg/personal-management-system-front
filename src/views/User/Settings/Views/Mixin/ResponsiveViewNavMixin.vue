<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  data():ComponentData {
    return {
      windowResizeCount: 0, // to trigger the computed
    }
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  computed: {
    rowFlexDirection(): string {
      // to trigger the computed refresh
      let resizeCount = this.windowResizeCount;
      if (window.innerWidth >= this.tabletBreakingPointPx) {
        return 'flex-row';
      }

      return 'flex-col';
    }
  },
  created(): void {
    window.addEventListener("resize", () => {
      this.windowResizeCount++;
    })
  }
}
</script>