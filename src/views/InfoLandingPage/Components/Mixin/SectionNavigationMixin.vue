<script lang="ts">
import DomService from "@/scripts/Core/Services/DomService";

export default {
  methods: {
    /**
     * @description will go to target section
     */
    goToSection(event: PointerEvent): void {
      let clickedElement = event.target as HTMLElement | null;
      DomService.goToSection(clickedElement);
    }
  }
}
</script>