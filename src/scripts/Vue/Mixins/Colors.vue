<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @description contains reusable color for whole project
 */
export default {
  name: "ColorsMixin",
  data(): ComponentData {
    return {
      color: {
        green  : "rgb(5, 150, 105)",   // equals to css class `-green-600`
        red    : "rgb(220, 38, 38)", // equals to css class `-red-600`
        blue   : "rgb(59, 130, 246)",  // equals to css class `-blue-500`
        orange : "rgb(255, 98, 0)"     // equals to css class `-orange-900`
      }
    }
  }
}
</script>