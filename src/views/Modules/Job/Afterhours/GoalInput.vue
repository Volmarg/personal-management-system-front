<template>
  <!-- No clue what is going on, but the options are not passed properly if this div wrapper is not present -->
  <div>
    <MultiSelect
        :label="$t('job.afterhours.new.form.goal.label')"
        :options="options"
        @change="onOptionChanged"
        @select="onOptionChanged"
        @deselect="onOptionChanged"
        @clear="onOptionChanged"
        @paste="onOptionChanged"
        v-model="selectedValue"
        mode="tags"
        max-options="1"
        :allow-show-options-list="true"
        :allow-create-options="true"
    />
  </div>
</template>

<script lang="ts">
import MultiSelect from "@/components/Form/MultiSelect.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {AfterhoursState} from "@/scripts/Vue/Store/Module/Job/Afterhours/AfterhoursState";
import TypeChecker       from "@/scripts/Core/Services/Types/TypeChecker";

export default {
  data(): ComponentData {
    return {
      selectedValue: [this.modelValue],
      afterhours: [],
      store: null as null | StoreDefinition
    }
  },
  props: {
    modelValue: {
      required: false,
    },
  },
  components: {
    MultiSelect
  },
  computed: {
    /**
     * @description returns the select options
     */
    options(): Array {
      let options = [];
      let addedGoals = [];
      for (let afterhour of this.afterhours) {
        if (TypeChecker.isNull(afterhour.goal) || addedGoals.includes(afterhour.goal)) {
          continue;
        }

        addedGoals.push(afterhour.goal);
        options.push({
          label: afterhour.goal,
          value: afterhour.goal,
        })
      }

      return options;
    }
  },
  methods: {
    /**
     * @description will save + emit the selected country when country selection option changes
     */
    onOptionChanged(value: number): void {
      this.selectedValue = [value];
      this.$emit('update:modelValue', value);
    }
  },
  async created(): Promise<void> {
    this.store = AfterhoursState();
    await this.store.getAll();
    this.afterhours = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.afterhours = this.store.allEntries;
      }
    },
    modelValue(): void {
      this.selectedValue = this.modelValue;
    }
  }
}
</script>