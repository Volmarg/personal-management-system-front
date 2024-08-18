<template>
  <div>
    <Vinput :label="$t('views.user.baseData.personalData.form.address.zip.label')"
            type="text"
            min="0"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="zip"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      zip: null,
    }
  },
  components: {
    'Vinput': Input
  },
  props: {
    violations: {
      type     : Array,
      required : true,
    },
    modelValue: {
      type     : Number,
      required : false,
    }
  },
  created() {
    this.zip = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.zip = this.modelValue;
    }
  }
}
</script>