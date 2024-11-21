<template>

  <div class="flex justify-center">
    <div class="mt-6 w-full lg:w-1/2 flex flex-col">
      <h2 class="text-lg mb-2">{{ $t('todo.common.form.createEditTodo.header.edit') }}</h2>
      <CreateEditForm :initial-desc="todoData.description"
                      :initial-name="todoData.name"
                      :initial-module-id="todoData?.module?.id ?? ''"
                      :initial-module-record-id="recordId"
                      :initial-show-on-dashboard="todoData.showOnDashboard"
                      :force-fetched-record-ids="forceFetchedRecordIds"
                      :id="todoData.id"
                      :can-select-module="canSelectModule"
                      @submit="$emit('updateConfirmClick')"
      />
    </div>
  </div>

</template>

<script lang="ts">
import CreateEditForm from "@/views/Modules/Todo/Components/CreateEditForm.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";


export default {
  data(): ComponentData {
    return {
      form: {
        name: ''
      },
    }
  },
  props: {
    todoData: {
      type: Object,
      required: true,
    },
    canSelectModule: {
      type: Boolean,
      required: false,
      default: true,
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  components: {
    CreateEditForm,
  },
  emits: [
    'updateConfirmClick'
  ],
  computed: {
    /**
     * @description returns the related module record id that is related to the "todo", or null if relation does not exist
     */
    recordId(): number | null {
      return this.todoData?.module?.entryId ?? null
    },
    /**
     * @description returns the ids of records that should be force fetched from backend (used in module/record select)
     */
    forceFetchedRecordIds(): Array<number> {
      if (!this.recordId) {
        return [];
      }

      return [this.recordId];
    }
  }
}
</script>