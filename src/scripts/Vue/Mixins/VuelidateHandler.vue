<script lang="ts">
import useVuelidate, {ErrorObject, ValidationRuleWithParams} from "@vuelidate/core";
import {getCurrentInstance} from "vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {email, required} from "@vuelidate/validators";

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
    validateValue(value: unknown, constraints: Array<ValidationRuleWithParams>): Array<string> {
      const currentVueInstance = getCurrentInstance()?.proxy
      const vuelidate = useVuelidate(constraints, value, { currentVueInstance })

      let errors = [] as Array<string>;
      for (let validation of vuelidate.value.$silentErrors) {
        errors.push(String(validation.$message))
      }

      return errors;
    },
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