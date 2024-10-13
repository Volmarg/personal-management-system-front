<template>
  <div @click="isEditModalVisible=true">
    <slot name="representation"></slot>
  </div>

  <EditModal :is-modal-visible="isEditModalVisible"
             :handled-data="handledData"
             @modal-closed="isEditModalVisible = false"
  >
    <template #form>
      <component v-if="form"
                 :is="form"
                 @form-submit="onFormSubmit"
                 v-bind.prop="{
                  rowData: handledData
                }"
      />
    </template>
  </EditModal>
</template>

<script lang="ts">
import EditModal from "@/components/Ui/Actions/Components/Edit/EditModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isEditModalVisible: false,
    }
  },
  props: {
    handledData: {
      type: Object,
      required: true,
    },
    updateUrl: {
      type: String,
      required: true,
    },
    form: {
      type: [Object, null], // component
      required: true,
    }
  },
  components: {
    EditModal,
  },
  methods: {
    /**
     * @description handles submitting the update form, updates data on backend + updates view,
     */
    onFormSubmit(data: Record): void {
      console.log({
        "what": "edit confirm",
        "url": this.updateUrl,
        "data": data,
      });
    },
  }
}
</script>