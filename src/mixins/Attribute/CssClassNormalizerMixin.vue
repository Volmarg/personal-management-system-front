<script lang="ts">
import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

/**
 * @description handles providing normalized css classes usable on dom elements
 */
export default {
  name: 'CssClassNormalizerMixin',
  methods: {
    /**
     * @description will return objet of classes merged together
     */
    mergeCssClasses(classesSetA: string | Record<string, boolean>, classesSetB: string | Record<string, boolean>): Record<string, boolean> {
      let normalizedClassesSetA = {};
      let normalizedClassesSetB = {};

      if( TypeChecker.isObject(classesSetA) ){
        normalizedClassesSetA = classesSetA
      }else{
        normalizedClassesSetA = this.classesStringToObject(classesSetA as string);
      }

      if( TypeChecker.isObject(classesSetB) ){
        normalizedClassesSetB = classesSetB;
      }else{
        normalizedClassesSetB = this.classesStringToObject(classesSetB as string);
      }

      return {
        ...normalizedClassesSetB,
        ...normalizedClassesSetA,
      };
    },
    /**
     * @description will turn the string based classes into object with `string` as key and `bool` as value,
     *              so that this object can be expanded with any other condition-able classes for Vue
     */
    classesStringToObject(classes: string): Record<string, boolean> {
      let regexp          = new RegExp(/([^ \n]*)/, 'm');
      let matchingClasses = classes.match(regexp);
      if( TypeChecker.isNull(matchingClasses) ){
        return {};
      }

      let classesObject = {};
      for(let className of classes.match(regexp) as RegExpMatchArray) {
        if( !StringTypeProcessor.isEmptyString(className) ){
          classesObject[className] = true;
        }
      }

      return classesObject;
    }
  }
}
</script>