<template>
  <!-- entries -->
  <div v-if="todoData.elements.length > 0">
    <SingleElement v-for="element of todoData.elements"
                   :key="JSON.stringify(element)"
                   :element="element"
    />

    <hr class="mt-4">
  </div>

  <NoResultsText v-else/>

  <!-- form -->
  <div class="flex justify-center w-full">
    <div class="w-full md:w-1/2">
      <div class="mt-6 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('todo.common.form.newTodoElement.header') }}</h2>

        <FormInput type="text"
                   :model-value="form.name"
                   :label="$t('todo.common.form.newTodoElement.name.label')"
        />

        <MediumButtonWithIcon :text="$t('todo.common.form.newTodoElement.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-2"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onNewSubmit"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SingleElement        from "@/views/Modules/Todo/Components/SingleTodo/EditModal/TabElements/SingleElement.vue";
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";


export default {
  data(): ComponentData {
    return {
      checkboxes: {},
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
    MediumButtonWithIcon,
    FormInput,
    NoResultsText,
    SingleElement,
  },
  emits: [
    'singleTodoClick'
  ],
  methods: {
    /**
     * @description handle submitting new tab element, insert data in db
     */
    onNewSubmit(): void {
      //todo
    }
  }
}
</script>