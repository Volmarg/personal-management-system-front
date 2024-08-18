<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
  >
    <path
        :fill="getUsedColor"
        d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/>
  </svg>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  name : "IconCheckmarkSvg",
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