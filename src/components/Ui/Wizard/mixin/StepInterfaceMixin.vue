<script lang="ts">
import BaseError from "@/scripts/Core/Error/BaseError";

/**
 * @description provides some pseudo interface logic to use in all the steps
 */
export default {
  emits: [
    "stepValidated"
  ],
  methods: {
    /**
     * @description will make sure that state of the step is valid
     */
    isValid(): boolean {
      throw new BaseError(`Implement Your own validation (isValid) logic for this step! Component: ${this.$options.name}`);
    },
  }
}
</script>