<template>
  <div>

    <Vinput :label="$t('views.user.baseData.personalData.form.address.homeNumber.label')"
            type="string"
            @input="$emit('update:modelValue', $event.target.value)"
            :is-required="true"
            :errors="violations"
            v-model="homeNumber"
    />
  </div>
</template>

<script lang="ts">

import Input from "@/components/Form/Input.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      homeNumber: null,
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
    },
  },
  created() {
    this.homeNumber = this.modelValue;
  },
  watch: {
    modelValue(): void {
      this.homeNumber = this.modelValue;
    }
  }
}
</script>