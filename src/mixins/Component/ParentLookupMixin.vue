<script lang="ts">
import {ComponentPublicInstance} from "vue";

export default {
  methods: {
    /**
     * @description searches maxLookup times for a parent component by given name
     */
    findComponentByName(name: string, maxLookup: number = 10): null | ComponentPublicInstance {
      let parent = null;
      for (let x = 0; x <= maxLookup; x++) {
        parent = !parent ? this.$parent : parent.$parent;

        if (parent?.$options?.name === name) {
          return parent;
        }

      }

      return null;
    }
  }
}
</script>