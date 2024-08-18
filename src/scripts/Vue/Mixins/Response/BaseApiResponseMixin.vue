<script lang="ts">
import BaseApiResponse, {InvalidFields} from "@/scripts/Response/BaseApiResponse";
import ArrayTypeProcessor               from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

type NormalizedViolations = Record<string, Array<string | number | null>>;

/**
 * @description handles logic related to {@see BaseApiResponse}
 */
export default {
  name: "BaseApiResponseMixin",
  methods: {
    /**
     * @description Will take the response invalid fields (with violations groups) and outputs object where
     * - [key] is the violated [field name],
     * - [value] is Array of [violationMessages]
     *
     * @param response
     */
    normalizeViolations(response: BaseApiResponse): NormalizedViolations {
      let normalizedViolations = {} as NormalizedViolations;
      normalizedViolations     = this._handleViolationsArray(response.invalidFields, normalizedViolations);

      return normalizedViolations;
    },
    /**
     *  @description
     *               If the violation Object consists of violation groups like for example:
     *               {
     *                  "standardViolations" = {"key1" => "message1"},
     *                  "extraViolations"    = {"key1" => "message2"},
     *               }
     *               Then:
     *               - the groups are being removed,
     *               - if 2 or more groups contain violation for same key then all of them are added into "array of messages" for given key
     *              -  will merge all the messages into one array and assign it to object representing violations for key
     *
     *               Else where the array contains just the messages like that:
     *               {
     *                 "key1" => ["message1", "message2"]
     *               }
     *               - will return the same structure
     */
    _handleViolationsArray(violationsArray: InvalidFields, normalizedViolations: NormalizedViolations): NormalizedViolations {

      for (let fieldName in violationsArray) {
        let violationData = violationsArray[fieldName];

        if (Array.isArray(violationData)) {
          if (ArrayTypeProcessor.isEmpty(violationData)) {
            continue;
          }

          normalizedViolations[fieldName] = violationData;
          continue;
        }

        if ("object" == typeof violationData && violationData !== null) {
          normalizedViolations = this._handleViolationsArray(violationData, normalizedViolations);
          continue;
        }

        let violationAdded   = false;
        for (let violatedField in this.violations) {
          if(fieldName === violatedField){

            if (undefined === normalizedViolations[fieldName]) {
              normalizedViolations[fieldName] = [];
            }

            normalizedViolations[fieldName].push(violationData);
            break;
          }
        }

        if (!violationAdded) {
          normalizedViolations[fieldName] = [violationData]
        }

      }

      return normalizedViolations;
    }
  }
}

</script>