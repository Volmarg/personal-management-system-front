<script lang="ts">

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialSmallSizeModal: "small"
    }
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  computed: {
    /**
     * @description returns the modal size based on the screen size
     */
    modalSize(): string {
      if (this.isTabletBreakingPoint) {
        return "full";
      }

      if (this.isLargeScreenBreakingPoint) {
        return "medium";
      }

      return this.initialSmallSizeModal;
    },
  }
}
</script>