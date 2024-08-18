<template>
  <div>
    <Vinput :label="$t('views.user.baseData.personalData.form.address.city.label')"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="city"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      city: null,
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
      required: false,
    }
  },
  created() {
    this.city = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.city = this.modelValue;
    }
  }
}
</script>