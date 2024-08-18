<template>
  <span v-on="eventsToHandlerMapping"
        :id="id"
  ></span>
</template>

<script lang="ts">
import EventDispatcherService from "@/scripts/Core/Services/Dispatcher/EventDispatcherService";

/**
 * @description this component serves as an element over which typescript events get emitted
 * @see EventDispatcherService
 * Additionally, vue requires (would like) to have the events emitted via the component
 * otherwise it floods the dev-console with warning, so not only the component is a central place
 * to gather the typescript events and pass the further but also mutes the vue warnings regarding
 * non-standard way to emit events for vue.
 *
 * @description additionally this component allows emitting events in vue itself
 *              - this should be generally avoided unless some special use cases like "emit on root from grandchildren"
 *
 */
export default {
  name: "DispatcherListener",
  /**
   * That's a drawback of this solution, there is n way to dynamically set emitted events,
   * Without this vue will just crash so need to pass all custom events supported by any dispatchers
   */
  emits: EventDispatcherService.ALL_EVENTS,
  props: {
    id: {
      type     : String,
      required : true,
    },
    supportedEvents: {
      type     : Array,
      required : true,
    }
  },
  computed: {
    /**
     * @description will return mapping of events to callable handler function
     */
    eventsToHandlerMapping(): Record<string, CallableFunction> {
      let eventsWithHandlers = {};
      for(let eventName of this.supportedEvents){
        eventsWithHandlers[eventName] = this.emitFurtherWithData;
      }

      return eventsWithHandlers;
    }
  },
  methods: {
    /**
     * @description will emit given event back to the Vue App
     *              - uses the provided event type,
     *              - passes event data
     */
    emitFurtherWithData(event: CustomEvent): void {
      let additionalParams = Object.values(event.detail);
      this.$emit(event.type, ...additionalParams);
    },
  }
}
</script>