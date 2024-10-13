<template>
  <div :class="{
    [actionsWrapperClasses]: true,
  }">
    <Edit v-if="canEdit"
          :handled-data="handledData"
          :form="editForm"
          :update-url="updateUrl"
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
            :remove-url="deleteUrl"
    >
      <template #representation>
        <slot name="deleteRepresentation"></slot>
      </template>
    </Delete>

  </div>
</template>

<script lang="ts">
import Delete from "@/components/Ui/Actions/Delete.vue";
import Edit   from "@/components/Ui/Actions/Edit.vue";

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
  components: {
    Delete,
    Edit,
  }
}
</script>