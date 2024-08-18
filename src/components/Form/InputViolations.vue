<template>
  <div v-if="areViolationsSet"
       class="input-violations-div-wrapper"
  >
    <ul>
      <li v-for="(violation, index) of violations"
          :key="index"
          class="text-red-500 text-xs italic"
      ><span v-html="violation"></span></li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "InputViolations",
  props: {
    violations: {
      type     : Array,
      required : false,
      default  : (): Array<string> => {
        return [];
      }
    }
  },
  computed: {
    /**
     * @description check if any violations are set
     */
    areViolationsSet(): boolean {
      return this.violations.length !== 0;
    }
  }
}
</script>