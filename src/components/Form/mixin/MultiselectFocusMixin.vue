<script lang="ts">
import BaseError       from "@/scripts/Core/Error/BaseError";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isFocused: false,
    }
  },
  computed: {
    /**
     * @description return the input used for the multiselect
     */
    targetInputFromRefs(): null | HTMLInputElement {
      return this.$refs.multiselectInput.$el.getElementsByTagName('input')[0];
    }
  },
  methods: {
    /**
     * @description that here is dirty fix (punishable yet necessary)
     *              the `MultiSelect` plugin does not support anyhow keeping the focus when adding one tag.
     *              With this, upon writing down and hitting [Enter] the focus will remain.
     */
    regainFocus(refName: string): void {
      // this is needed else this method is getting endlessly called until max-time call-stack is exceeded
      if (this.isFocused) {
        this.isFocused = false;
        return;
      }

      let inputs = this.$refs[refName].$el.getElementsByTagName('input')
      let input  = inputs[0];

      input.focus();
      this.isFocused = true;
    },
    /**
     * @description multiselect focus-out handler,
     *              - if "tags" mode then automatically adding the text that user wrote as "tag"
     *                that's on purpose because during tests it was found that users don't understand
     *                how this field works
   *                - the logic must be excluded for list based tag mode because it becomes very glitchy
     */
    onFocusOut(event: FocusEvent): void {
      if (!this.isTagMode || this.allowShowOptionsList) {
        return;
      }

      let eventTarget = event.target as null | HTMLElement;
      if (!eventTarget) {
        throw new BaseError("Target element for multiselect is null - during focus out event");
      }

      let keyboardEvent = new KeyboardEvent('keydown', {
        bubbles    : true,
        cancelable : true,
        key        : 'Enter',
      });

      /**
       * @description this remove & attach is needed as otherwise the input will be stuck in endless focus
       */
      this.removeFocusOutHandler();
      eventTarget.dispatchEvent(keyboardEvent);
      eventTarget.blur();
      this.attachOnFocusOutHandler();
    },
    /**
     * @description attaches focus out event - for "tag" mode
     */
    attachOnFocusOutHandler(): void {
      if (!this.isTagMode) {
        return;
      }

      if (!this.targetInputFromRefs) {
        return;
      }

      this.targetInputFromRefs.addEventListener('focusout', this.onFocusOut);
    },
    /**
     * @description removes the focus out event - for "tag" mode
     */
    removeFocusOutHandler(): void {
      if (!this.isTagMode) {
        return;
      }

      if (!this.targetInputFromRefs) {
        return;
      }

      this.targetInputFromRefs.removeEventListener('focusout', this.onFocusOut);
    },
  }
}
</script>