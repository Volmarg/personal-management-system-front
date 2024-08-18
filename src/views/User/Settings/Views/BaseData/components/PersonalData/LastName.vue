<template>
  <div>
    <Vinput :label="$t('views.user.baseData.personalData.form.lastName.label')"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="lastname"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      lastname: null,
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
    this.lastname = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.lastname = this.modelValue;
    }
  }
}
</script>