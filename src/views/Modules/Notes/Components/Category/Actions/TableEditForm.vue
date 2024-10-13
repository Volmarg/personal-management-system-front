<template>
  <AddEditForm :initial-name="initialName"
               :initial-category="initialCategory"
               :header="$t('notes.settings.form.header.edit')"
               form-wrapper-classes="w-full"
  />
</template>

<script lang="ts">
import AddEditForm from "@/views/Modules/Notes/Components/Category/AddEditForm.vue";

import TableRowDataActionMixin from "@/components/Ui/Actions/Mixin/TableRowDataActionMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      initialName: '',
      initialCategory: null,
    }
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    }
  },
  components: {
    AddEditForm,
  },
  mixins: [
    TableRowDataActionMixin
  ],
  created(): void {
    this.initialName = this.getValueFromSource({identifierName: 'fieldName', identifierValue: 'Category', sourceValue: 'value'}, this.rowData) ?? '';
  }
}
</script>