<template>
  <div class="calendars-list">
    <div class="mt-5 mb-4 flex flex-row ml-1.5 hover:opacity-70 cursor-pointer">
      <Checkbox class="transform scale-75"
                v-model="viewAllChecked"
                @click="onViewAllClick"
      />
      <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
             @click="onViewAllClick"
      >{{ $t('calendar.navbar.view.calendarsSidebar.viewAll.label') }}</label>
    </div>
    <hr class="mb-4">

    <CalendarCheckbox v-for="calendar in calendars"
                      :key="JSON.stringify(calendar)"
                      :title="calendar.title"
                      :id="calendar.id"
                      :color="calendar.color"
                      @calendar-filter="onCalendarFilter"
                      ref="calendarCheckbox"
    />
  </div>
</template>

<script lang="ts">
import Checkbox         from "@/components/Form/Checkbox.vue";
import CalendarCheckbox from "@/views/Modules/Calendar/Schedules/Components/CalendarCheckbox.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      viewAllChecked: true,
    }
  },
  props: {
    calendarsData: {
      type: Array,
      required: true,
    }
  },
  components: {
    Checkbox,
    CalendarCheckbox
  },
  emits: [
    "calendarFilter"
  ],
  computed: {
    /**
     * @description returns the minimalistic calendars data
     */
    calendars(): Array {
      let calendars = [] as Array;
      for (let calendar of this.calendarsData) {
        calendars.push({
          id: calendar.id,
          color: calendar.color,
          title: calendar.name,
        });
      }

      return calendars;
    }
  },
  methods: {
    /**
     * @description check if all the calendar filter checkboxes are checked
     */
    areAllChecked(): boolean {
      for (let ref of this.$refs['calendarCheckbox']) {
        if (!ref.isChecked) {
          return false
        }
      }

      return true;
    },
    /**
     * @description handle clicking on single calendar filter checkbox, sends event and update `view all` checkbox
     */
    onCalendarFilter(data: Record): void {
      this.$emit('calendarFilter', data);
      this.viewAllChecked = this.areAllChecked();
    },
    /**
     * @description handle user clicking on toggle-all, show/hide calendars
     */
    onViewAllClick(): void {
      let newState = !this.viewAllChecked;
      for (let ref of this.$refs['calendarCheckbox']) {
        ref.setChecked(newState);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.calendars-list {
  min-width: 180px;
  @apply bg-gray-100 flex flex-col relative
}

.calendar-item {
  @apply self-start ml-4
}
</style>

<style lang="scss">
.calendar-item + .calendar-item {
  @apply mt-3
}
</style>