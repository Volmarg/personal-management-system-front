<template>
  <div :class="{
    [actionsWrapperClasses]: true,
  }">
    <Edit v-if="canEdit"
          :handled-data="handledData"
          :form="editForm"
          :base-url="baseUrl"
          :record-id="recordId"
          :parent-record-id="parentRecordId"
          :fetch-all="fetchAll"
          :store="store"
    >
      <template #form>
        <slot name="editForm"></slot>
      </template>
      <template #representation>
        <slot name="editRepresentation"></slot>
      </template>
    </Edit>

    <Delete v-if="canDelete"
            :handled-data="handledData"
            :base-url="baseUrl"
            :record-id="recordId"
            :fetch-all="fetchAll"
            :store="store"
    >
      <template #representation>
        <slot name="deleteRepresentation"></slot>
      </template>
    </Delete>

    <CopyToClipboard v-if="canCopyToClipboard"
                     :handled-data="handledData"
                     :copied-data-key="copiedDataKey"
    >
      <template #representation>
        <slot name="copyToClipboardRepresentation"></slot>
      </template>
    </CopyToClipboard>

  </div>
</template>

<script lang="ts">
import Delete          from "@/components/Ui/Actions/Delete.vue";
import Edit            from "@/components/Ui/Actions/Edit.vue";
import CopyToClipboard from "@/components/Ui/Actions/CopyToClipboard.vue";

import BaseError from "@/scripts/Core/Error/BaseError";

import {StoreDefinition} from "pinia";

export default {
  props: {
    canEdit: {
      type: Boolean,
      required: false,
      default: true,
    },
    canDelete: {
      type: Boolean,
      required: false,
      default: true,
    },
    canCopyToClipboard: {
      type: Boolean,
      required: false,
      default: false,
    },
    copiedDataKey: {
      type: String,
      required: false,
    },
    actionsWrapperClasses: {
      type: String,
      required: false,
      default: ''
    },
    handledData: {
      type: Object,
      required: true,
    },
    editForm: {
      type: [Object, null], // component
      required: true,
    },
    isModule: {
      type: Boolean,
      required: false,
      default: true,
      validator(isModule: boolean): boolean {
        if (!isModule) {
          throw new BaseError("Actions are currently supported only for modules!")
        }

        return true;
      }
    },
    baseUrl: {
      type: String,
      required: true,
    },
    recordId: {
      type: Number,
      required: true,
    },
    parentRecordId: {
      type: [Number, null],
      required: false,
      default: null
    },
    fetchAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    store: {
      type: [Object as StoreDefinition, null, Array],
      required: false,
      default: null,
    }
  },
  components: {
    CopyToClipboard,
    Delete,
    Edit,
  }
}
</script>