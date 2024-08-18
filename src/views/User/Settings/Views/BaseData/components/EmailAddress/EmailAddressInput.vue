<template>
  <div>
    <Vinput :label="$t('views.user.baseData.email.form.email')"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="emailAddress"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      emailAddress: null,
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
    this.emailAddress = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.emailAddress = this.modelValue;
    }
  }
}
</script>