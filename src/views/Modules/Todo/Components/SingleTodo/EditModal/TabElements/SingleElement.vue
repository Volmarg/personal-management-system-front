<template>
  <div class="todo-row">
    <div class="flex flex-row justify-between">
      <div class="my-1 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="isChecked"
                  ref="checkbox"
        />

        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="$refs.checkbox.toggle()"
        >
          {{ element.name }}
        </label>
      </div>

      <StateBadge :is-done="isChecked" />

    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StateBadge from "@/views/Modules/Todo/Components/StateBadge.vue";
import Checkbox   from "@/components/Form/Checkbox.vue";

/**
 * @description this component was added due to some weird issue with tabs, it looks like tab
 *              can't sometimes see the $refs so had problems with tracking the checkbox state
 */
export default {
  data(): ComponentData {
    return {
      isChecked: false,
    }
  },
  props: {
    element: {
      type: Object,
      required: true,
    }
  },
  components: {
    Checkbox,
    StateBadge
  },
  created(): void {
    this.isChecked = this.element.isDone;
  }
}
</script>