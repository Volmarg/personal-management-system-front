<template>
  <div class="single-todo"
       :class="{
          'fixed-size': !isLargeScreenBreakingPoint,
          'auto-size': isLargeScreenBreakingPoint
       }"
       v-tippy="{
          content: $t('todo.common.singleTodoHover.text', {name: name, description: description}),
          placement: 'top'
       }"
       @click="onSingleTodoClick"
  >
    <!-- Add `flex flex-row` when using the showOnDashboard -->
    <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div class="flex flex-row">
        <!-- not supported for dashboard atm. -->
        <IsOnDashboardState :is-for-dashboard="showOnDashboard"
                            class="mr-2 self-end"
                            v-if="false"
        />

        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-col">
            <div class="name text-2md">{{ usedName }}</div>
            <div class="description">{{ usedDesc }}</div>
          </div>
          <slot name="icon"></slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import IsOnDashboardState from "@/components/Ui/State/IsOnDashboardState.vue";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      conf: {
        descMaxLen: 90,
        nameMaxLen: 45,
      }
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showOnDashboard: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  emits: [
    'singleTodoClick'
  ],
  components: {
    IsOnDashboardState,
  },
  computed: {
    /**
     * @description returns the shortened (if necessary) description show in the block
     */
    usedDesc(): string {
      if (this.description.length < this.conf.descMaxLen) {
        return this.description;
      }

      return StringTypeProcessor.reduceStringToCharactersCount(this.description, this.conf.descMaxLen);
    },
    /**
     * @description returns the shortened (if necessary) name show in the block
     */
    usedName(): string {
      if (this.name.length < this.conf.nameMaxLen) {
        return this.name;
      }

      return StringTypeProcessor.reduceStringToCharactersCount(this.name, this.conf.nameMaxLen);
    },
  },
  methods: {
    /**
     * @description passes the event further, this is needed to show the modal
     */
    onSingleTodoClick(): void {
      this.$emit('singleTodoClick');
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  @apply uppercase text-left font-bold
}

.description {
  @apply text-xs text-left text-gray-500
}

.fixed-size {
  $width: 349px !important;
  $height: 90px !important;

  // uncomment when using the show-for-dashboard
  //$height: 95px !important;


  min-width: $width;
  max-width: $width;
  min-height: $height;
  max-height: $height;

  .widget {
    min-width: $width;
    max-width: $width;
    min-height: $height;
    max-height: $height;
  }

  @apply m-2
}

.auto-size {
  @apply w-full lg:w-1/4 my-2
}

.single-todo {
  @apply cursor-pointer hover:scale-110 transform transition-transform ease-in-out
}
</style>
