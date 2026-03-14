<template>
  {{ label }}
  <span class="text-gray-400 italic text-tiny"
        v-if="description"
  >
    - {{ description }}
  </span>
</template>

<script lang="ts">

export default {
  props: {
    ruleType: {
      type: String,
      required: true
    }
  },
  computed: {
    label(): string {
      return this.$t(`payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.${this.ruleType}.label`);
    },
    description(): string {
      let typeLabelDescTransStr = `payments.settings.tab.monthlyImport.tab.filterRule.form.element.ruleType.option.${this.ruleType}.description`;
      let typeLabelDesc = this.$t(typeLabelDescTransStr);

      return (typeLabelDesc !== typeLabelDescTransStr) ? typeLabelDesc : '';
    }
  }
}
</script>
