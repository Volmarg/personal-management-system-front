<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
  >
    <path
        :fill="getUsedColor"
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/>
  </svg>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  name : "IconXSvg",
  data(): ComponentData {
    return{
      config: {
        defaultColor: "black",
      }
    }
  },
  props: {
    color: {
      type     : String,
      required : false,
    }
  },
  computed: {
    /**
     * @description Will return the color used for the icon
     */
    getUsedColor(): string {
      if( StringTypeProcessor.isEmptyString(this.color) ){
        return this.config.defaultColor;
      }

      return this.color;
    }
  }
}
</script>