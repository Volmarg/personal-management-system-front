<template>
  <div>
    <v-input v-model="name"
             type="text"
             :label="$t('views.user.settings.files.modal.singleCvData.userBasedName.input.label')"
             @input="$emit('update:modelValue', name)"
             class="input-main-wrapper"
    />
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import Input           from "@/components/Form/Input.vue";

export default {
  data(): ComponentData {
    return {
      name: this.initialName,
    }
  },
  props: {
    modelValue: {
      required: false,
    },
    initialName: {
      type     : String,
      required : true,
    }
  },
  components: {
    "v-input": Input,
  },
  watch: {
    modelValue(): void {
      this.name = this.modelValue;
    }
  }
}
</script>

<style lang="scss">
.input-main-wrapper {
  margin-bottom: 0 !important;
}

</style>