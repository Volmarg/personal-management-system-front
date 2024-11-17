<template>
  <div class="todo-row">
    <div class="flex flex-row justify-between">
      <div class="my-1 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="isChecked"
                  @click="isTouched = true"
                  ref="checkbox"
        />

        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="$refs.checkbox.toggle();isTouched = true;"
        >
          {{ element.name }}
        </label>
      </div>

      <div class="flex flex-row">
        <StateBadge :is-done="isChecked" />

        <div class="ml-4 self-center">
          <Badge class="action-button"
                 @click="$emit('editClick', $event)"
          >
            <fa icon="edit"
                class="ml-2"
            />
          </Badge>


          <Badge class="ml-2 action-button"
                 background-class="bg-red-500"
                 @click="$emit('removeClick', $event)"
          >
            <fa icon="trash"
                class="ml-2"
            />
          </Badge>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {SingleElement, SingleTodo} from "@/scripts/Core/Types/Modules/Todo";

import StateBadge from "@/views/Modules/Todo/Components/StateBadge.vue";
import Checkbox   from "@/components/Form/Checkbox.vue";

import SymfonyTodoRoutes       from "@/router/SymfonyRoutes/Modules/SymfonyTodoRoutes";
import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";

import BaseApiResponse from "@/scripts/Response/BaseApiResponse";
import Badge           from "@/components/Ui/Badge/Badge.vue";

/**
 * @description this component was added due to some weird issue with tabs, it looks like tab
 *              can't sometimes see the $refs so had problems with tracking the checkbox state
 */
export default {
  data(): ComponentData {
    return {
      isChecked: false,
      isTouched: false,
      canUpdate: true,
    }
  },
  props: {
    todo: {
      type: Object as SingleTodo,
      required: true,
    },
    element: {
      type: Object,
      required: true,
    }
  },
  components: {
    Badge,
    Checkbox,
    StateBadge
  },
  emits: [
    "editClick",
    "removeClick",
  ],
  methods: {
    /**
     * @description update the element state
     */
    async updateElement(): void {
      let data = {
        isCompleted: this.isChecked,
        name: this.element.name, // name is not really needed from current context, but adding it just reduces backend code a lot
      };

      let config = new BackendModuleCallConfig(SymfonyTodoRoutes.TODO_ELEMENT_BASE_URL, this.element.id, BaseApiResponse, data);
      config.parentId = this.todo.id;
      config.reload   = false;

      let response = await this.$moduleCall.update(config);
      if (!response.success) {
        this.canUpdate = false;
        this.isChecked = !this.isChecked;
        return;
      }

      /**
       * @description modifying the element in todo on purpose, else upon opening the modal again, the element won't have proper state
       */
      let matchingElement: SingleElement = this.todo.elements.find((element: SingleElement) => element.id == this.element.id);
      matchingElement.isDone = this.isChecked;
    }
  },
  created(): void {
    this.isChecked = this.element.isDone;
  },
  watch: {
    isChecked(): void {
      if (this.canUpdate && this.isTouched) {
        this.updateElement();
      }

      this.canUpdate = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  @apply cursor-pointer hover:opacity-70 self-center
}
</style>