<template>

  <SmallDataBlock :show-elements-in-block="showElementsInBlock"
                  :is-interactive="isInteractive"
                  v-tippy="{
                    content: blockTippyContent,
                    placement: 'top'
                 }"
                  @click="onSingleTodoClick"
  >
    <template #outer>
      <!-- not supported for dashboard atm. -->
      <IsOnDashboardState :is-for-dashboard="showOnDashboard"
                          class="mr-2 self-end"
                          v-if="isInteractive"
      />
    </template>

    <template #topLine>
      {{usedName}}
    </template>

    <template #bottomLine>
      {{usedDesc}}
    </template>

    <template #addition>
      <div v-if="showElementsInBlock"
           class="w-full"
      >
        <ul class="w-full mt-4">

          <li v-for="element in elements"
              :key="JSON.stringify(element)"
              class="flex flex-row justify-between text-left mt-1"
          >
            <span>{{element.name}}</span>
            <StateBadge :is-done="element.isDone" />
          </li>

        </ul>
      </div>
    </template>

  </SmallDataBlock>

</template>

<script lang="ts">
import SmallDataBlock     from "@/components/Ui/Containers/SmallDataBlock.vue";
import StateBadge         from "@/views/Modules/Todo/Components/StateBadge.vue";
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
    elements: {
      type: Array,
      required: false,
      default: function () {
        return [];
      }
    },
    showOnDashboard: {
      type: Boolean,
      required: true,
    },
    isInteractive: {
      type: Boolean,
      required: false,
      default: true,
    },
    showElementsInBlock: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  emits: [
    'singleTodoClick'
  ],
  components: {
    StateBadge,
    SmallDataBlock,
    IsOnDashboardState,
  },
  computed: {
    /**
     * @description returns the tippy content displayed on block hover
     */
    blockTippyContent(): string {
      let baseText =  this.$t('todo.common.singleTodoHover.text', {
        name: this.name,
        description: this.description
      });

      let editTextPart = this.isInteractive ? this.$t('todo.common.singleTodoHover.textEditPart') : ''

      return baseText + editTextPart;
    },
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
      if (!this.isInteractive) {
        return;
      }
      this.$emit('singleTodoClick');
    }
  }
}
</script>