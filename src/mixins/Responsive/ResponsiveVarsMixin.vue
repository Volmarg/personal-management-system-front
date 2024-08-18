<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * {@link https://tailwindcss.com/docs/responsive-design}
 */
export default {
  data(): ComponentData {

    return {
      // Whenever changing the px values then also change the values in `responsive.scss`
      tabletBreakingPointPx: 767,
      isTabletBreakingPoint: false,
      phoneBreakingPoint: 640,
      isPhoneBreakingPoint: false,
      largeScreenBreakingPoint: 1024,
      isLargeScreenBreakingPoint: false,
    }
  },
  methods: {
    /**
     * @description check if screen has size of tablet breaking point
     */
    checkIsTabledBreakingPoint(): void {
      this.isTabletBreakingPoint = window.innerWidth <= this.tabletBreakingPointPx;
    },
    /**
     * @description check if screen has size of phone breaking point
     */
    checkIsPhoneBreakingPoint(): void {
      this.isPhoneBreakingPoint = window.innerWidth <= this.phoneBreakingPoint;
    },
    /**
     * @description check if screen has size of phone breaking point
     */
    checkIsLargeScreenBreakingPoint(): void {
      this.isLargeScreenBreakingPoint = window.innerWidth <= this.largeScreenBreakingPoint;
    }
  },
  created(): void {
    //init check
    this.checkIsTabledBreakingPoint();
    this.checkIsPhoneBreakingPoint();
    this.checkIsLargeScreenBreakingPoint();

    window.addEventListener("resize", () => {
      this.checkIsTabledBreakingPoint();
      this.checkIsPhoneBreakingPoint();
      this.checkIsLargeScreenBreakingPoint();
    })
  }
}
</script>