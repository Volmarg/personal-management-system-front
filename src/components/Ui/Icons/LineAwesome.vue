<template>
  <span v-html="svgContent"
       v-if="svgContent"
       :style="cssVariables"
       class="line-awesome-icon-wrapper"
  ></span>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * Provides dirty way of loading icons of the package: https://icons8.com/line-awesome
 * The dirty solution is necessary as the `line-awesome` has no native support for loading icons in vue,
 * - importing css / scss won't work as the classes are using relative fonts paths,
 * - DOWNSIDE: the svg icon files names have to be used
 *   - search for icon name on their page,
 *   - find svg file name in `node_modules/line-awesome`
 */
export default {
  data(): ComponentData {
    return {
      svgContent: null,
      wtf: "green"
    }
  },
  computed: {
    // that's a hack to use the props in styles, the computed has to be called inside `style` to assign the variables
    cssVariables(): Record<string, string> {
      return {
        "--fill"      : this.color,
        "--font-size" : `${this.fontSize}px`,
      }
    }
  },
  props: {
    svgIconName: {
      type     : String,
      required : true,
    },
    color: {
      type     : String,
      required : false,
      default  : "black",
    },
    fontSize: {
      type     : Number,
      required : false,
      default  : 25,
    }
  },
  methods: {
    /**
     * Fetches the svg icon content:
     * - standard svg styling works fine in this case
     */
    async fetchIconContent(): Promise<void> {
      /**
       * First the icon has to be imported this way, so it will be accessible via url, this path won't work with axios calls
       * also `import` is not yielding the file content (in this case the svg)
       */
      let importedPath = await import(`../../../../node_modules/line-awesome/svg/${this.svgIconName}.svg`).then((result) => {
        return result.default;
      });

      /**
       * Not that the import is made, the svg content can be fetched, seems no to have any performance issue tbh.
       */
      this.svgContent = await this.$axios.getRaw(importedPath).then( (result) => {
        return result.data;
      })

    }
  },
  mounted(): void {
    this.fetchIconContent();
  },
}
</script>

<style lang="scss">
.line-awesome-icon-wrapper {
  @apply h-full inline-block;

  svg {
    display: inline;
    height: var(--font-size);
    width: var(--font-size);
  }
  path {
    fill: var(--fill);
  }
}
</style>
