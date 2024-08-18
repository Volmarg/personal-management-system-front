<script lang="ts">
/**
 * @description will take the fields violations from base api response {@see BaseApiResponse.invalidFields}
 *              It's important to ensure that Vue.data has such structure present:
 *              {
 *                violations: {
 *                  <field1> : [],
 *                  <field2> : []
 *                }
 *              }
 *
 *              where each <field> corresponds to the validated/violated name of field
 */
import BaseApiResponse from "@/scripts/Response/BaseApiResponse";

import Logger from "@/scripts/Core/Logger";

export default {
  name: "BaseApiResponseViolationsToDataFieldsViolations",
  methods: {
    /**
     * @description handle transforming all types of violations to array of violations for field
     */
    responseViolationsToFieldViolations(response: BaseApiResponse): void {
      let violationsOfEachType = Object.values(response.invalidFields) as Array<string>;
      for(let violationsOfType of violationsOfEachType){
        if(violationsOfType.length === 0){
          continue;
        }

        let violatedFieldsNames = Object.keys(violationsOfType);
        for(let violatedFieldName of violatedFieldsNames){
          let violationMessage = violationsOfType[violatedFieldName];

          if (undefined === this.violations[violatedFieldName]) {
            this.violations[violatedFieldName] = [];
          }

          let arrayOfViolationsForFieldName = this.violations[violatedFieldName];
          if( !arrayOfViolationsForFieldName ){
            Logger.error("Field is missing in `data.violations`", {
              "data.violations"        : this.violations,
              "response.invalidFields" : response.invalidFields,
            });
          }
          arrayOfViolationsForFieldName.push(violationMessage)
        }
      }

    }
  }
}
</script>