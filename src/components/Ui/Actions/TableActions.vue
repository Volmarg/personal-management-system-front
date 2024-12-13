<template>
  <Actions actions-wrapper-classes="flex flex-row gap-x-1"
           :handled-data="formData"
           :record-id="recordId"
           :edit-form="editActionForm"
           :is-module="isModule"
           :base-url="baseUrl"
           :parent-record-id="parentRecordId"
           :fetch-all="fetchAll"
           :store="store"
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

import BaseError from "@/scripts/Core/Error/BaseError";

import {StoreDefinition} from "pinia";

export default {
  data(): ComponentData {
    return {
      parentRecordId: null as number | null,
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
    identifierFieldName: {
      type: [String, null],
      required: false,
      default: null
    },
    isModule: {
      type: Boolean,
      required: false,
      default: true,
      validator(isModule: boolean): boolean {
        if (!isModule) {
          throw new BaseError("Table actions are currently supported only for modules!")
        }

        return true;
      }
    },
    baseUrl: {
      type: String,
      required: true,
    },
    fetchAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    store: {
      type: [Object as StoreDefinition, null],
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
  computed: {
    /**
     * @description returns the record id extracted from the table row
     */
    recordId(): number {
      let cells = Object.values(this.rowData);
      let matchingCell = cells.find((cellData: Record) => cellData.fieldId == "id" || cellData.fieldId == "identifier");
      if (!matchingCell && this.identifierFieldName) {
        matchingCell = cells.find((cellData: Record) => cellData.fieldId == this.identifierFieldName);
      }

      if (!matchingCell) {
        throw new BaseError("Could not determine record id for table actions", {
          rowData: this.rowData
        });
      }

      return matchingCell.rawValue;
    },
    /**
     * @description transforms the row data into form data
     */
    formData(): Record {
      let formData = {};
      for (let cellData of this.rowData) {
        formData[cellData.fieldId] = cellData.rawValue;
      }

      return formData;
    },
  },
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