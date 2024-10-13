<template>
  <Actions actions-wrapper-classes="flex flex-row gap-x-1"
           :handled-data="rowData"
           :edit-form="editActionForm"
           :update-url="usedUpdateUrl"
           :delete-url="usedDeleteUrl"
  >
    <template #deleteRepresentation>
      <div class="button bg-red-500">
        <fa icon="trash"/>
      </div>
    </template>

    <template #editRepresentation>
      <div class="button bg-blue-500">
        <fa icon="edit" />
      </div>
    </template>

  </Actions>
</template>

<script lang="ts">
import Actions from "@/components/Ui/Actions/Actions.vue";

import TableRowDataActionMixin from "@/components/Ui/Actions/Mixin/TableRowDataActionMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      usedUpdateUrl: this.editUrl,
      usedDeleteUrl: this.deleteUrl,
    }
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    editActionForm: {
      type: [Object, null], // component
      required: true,
    },
    updateUrl: {
      type: [String, null],
      required: false,
      default: null,
    },
    deleteUrl: {
      type: [String, null],
      required: false,
      default: null,
    }
  },
  mixins: [
    TableRowDataActionMixin,
  ],
  components: {
    Actions
  },
  created(): void {
    this.usedUpdateUrl = this.buildUrl(
        this.updateUrl,
        {
          identifierName: 'fieldName',
          identifierValue: 'Category',
          sourceValue: 'value'
        },
        this.rowData
    );
    this.usedDeleteUrl = this.buildUrl(
        this.deleteUrl,
        {
          identifierName: 'fieldName',
          identifierValue: 'Category',
          sourceValue: 'value'
        },
        this.rowData
    );
  }
}
</script>

<style lang="scss" scoped>
.button {
  $size: 30px;
  width: $size;
  height: $size;

  @apply uppercase font-bold inline-flex text-center text-white text-xs p-2 cursor-pointer hover:opacity-70 rounded-md
}
</style>

<style lang="scss">
.button {
  svg[data-icon="trash"], svg[data-icon="edit"] {
    margin: 0 !important;
    margin-left: 1px !important;
    margin-bottom: 1px !important;
  }
}
</style>