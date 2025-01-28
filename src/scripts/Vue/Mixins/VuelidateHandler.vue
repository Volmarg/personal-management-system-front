<script lang="ts">
import {ErrorObject}   from "@vuelidate/core";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

/**
 * @description special logic for handling
 * @link https://www.npmjs.com/package/@vuelidate/core?activeTab=readme
 */
export default {
  name: "VuelidateHandler",
  data(): ComponentData {
    return {
      isVuelidateResultValid: false,
    }
  },
  methods: {
    /**
     * @description will return array of violation for each property
     */
    vuelidateErrorsToPropsViolation(errorObjects: Array<ErrorObject>): Record<string, Array<string>> {
      let violationsForFields = {};
      if(0 === errorObjects.length){
        this.isVuelidateResultValid = true;
        return {};
      }

      for(let errorObject of errorObjects){
        if("undefined" === typeof violationsForFields[errorObject.$property]){
          violationsForFields[errorObject.$property] = [errorObject.$message]
        }else{
          violationsForFields[errorObject.$property].push(errorObject.$message);
        }
      }

      this.isVuelidateResultValid = false;
      return violationsForFields;
    }
  }
}
</script>