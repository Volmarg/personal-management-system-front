<template>

  <div class="flex justify-center">
    <div class="mt-6 w-full lg:w-1/2 flex flex-col">
      <h2 class="text-lg mb-2">{{ $t('todo.common.form.createEditTodo.header.edit') }}</h2>
      <CreateEditForm :initial-desc="todoData.description"
                      :initial-name="todoData.name"
                      :initial-module="todoData.module.name"
                      :initial-module-record="todoData.module.id"
                      :initial-show-on-dashboard="todoData.showOnDashboard"
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
  },
  components: {
    CreateEditForm,
  },
  emits: [
    'singleTodoClick'
  ],
}
</script>