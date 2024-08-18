<template>
  <div>

    <Vinput :label="$t('views.user.baseData.personalData.form.address.street.label')"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="street"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      street: null,
    }
  },
  emits: [
    "update:modelValue"
  ],
  components: {
    'Vinput': Input
  },
  props: {
    violations: {
      type     : Array,
      required : true,
    },
    modelValue: {
      required: false,
    },
  },
  created() {
    this.street = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.street = this.modelValue;
    }
  }
}
</script>