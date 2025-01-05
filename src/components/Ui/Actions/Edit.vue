<template>
  <div @click="isEditModalVisible=true"
       v-tippy="{
          content: $t('components.actions.edit.label'),
          placement: 'top'
       }"
  >
    <slot name="representation"></slot>
  </div>
  <teleport to="body">
    <EditModal :is-modal-visible="isEditModalVisible"
               :handled-data="handledData"
               @modal-closed="isEditModalVisible = false"
               ref="modal"
    >
      <template #form>
        <!-- it's expected that handled data keys are the same as form props, so values will be auto-set -->
        <component v-if="form"
                   :is="form"
                   @form-submit="onFormSubmit"
                   @submit="onFormSubmit"
                   v-bind.prop="{
                    ...handledData
                  }"
        />
      </template>
    </EditModal>
  </teleport>
</template>

<script lang="ts">
import EditModal from "@/components/Ui/Actions/Components/Edit/EditModal.vue";

import ActionMixin from "@/components/Ui/Actions/Mixin/ActionMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import TypeChecker     from "@/scripts/Core/Services/Types/TypeChecker";

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
    baseUrl: {
      type: String,
      required: true,
    },
    form: {
      type: [Object, null], // component
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
  },
  components: {
    EditModal,
  },
  mixins: [
    ActionMixin,
  ],
  methods: {
    /**
     * @description handles form after-update, updates view,
     */
    onFormSubmit(): void {
      this.validateStoreFetchConf();
      if (this.useStoreFetch) {
        this.fetchStoreData();
        this.$refs.modal.onModalClosed();
      }
    }
  }
}
</script>