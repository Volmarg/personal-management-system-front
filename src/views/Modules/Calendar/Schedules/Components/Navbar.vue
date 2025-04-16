<template>
  <div class="flex flex-col md:flex-row justify-between">
    <!-- left side-->
    <div class="flex flex-col md:flex-row gap-y-2 md:gap-y-0">
      <MediumButtonWithIcon @button-click="calendarInstance.prev()"
                            :text="$t('calendar.navbar.back.label')"
                            :margin-right-class-number="1"
                            class="w-full md:w-auto m-0-force"
                            button-classes="w-full md:w-auto"
                            text-classes="text-center w-full"
      >
        <template #icon>
          <fa icon="arrow-left" />
        </template>
      </MediumButtonWithIcon>
      <MediumButtonWithIcon @button-click="calendarInstance.today()"
                            :text="$t('calendar.navbar.today.label')"
                            :margin-right-class-number="1"
                            class="w-full md:w-auto m-0-force"
                            button-classes="w-full md:w-auto"
                            text-classes="text-center w-full"
      >
        <template #icon>
          <fa icon="arrow-down" />
        </template>
      </MediumButtonWithIcon>
      <MediumButtonWithIcon @button-click="calendarInstance.next()"
                            :text="$t('calendar.navbar.forward.label')"
                            :margin-right-class-number="1"
                            class="w-full md:w-auto m-0-force"
                            button-classes="w-full md:w-auto"
                            text-classes="text-center w-full"
      >
        <template #icon>
          <fa icon="arrow-right" />
        </template>
      </MediumButtonWithIcon>
    </div>

    <!-- right side -->
    <div class="flex flex-col md:flex-row gap-y-2 md:gap-y-0 mt-2 md:mt-0">
      <div class="relative">
        <ViewMenu :is-menu-open="isViewMenuOpen"
                  v-click-away="onViewMenuAwayClick"
                  @day-click="onViewChange('day')"
                  @week-click="onViewChange('week')"
                  @month-click="onViewChange('month')"
        />
        <MediumButtonWithIcon @button-click="isViewMenuOpen = true"
                              :text="$t('calendar.navbar.view.label')"
                              :margin-right-class-number="1"
                              class="w-full md:w-auto m-0-force"
                              button-classes="w-full md:w-auto calendar-view"
                              text-classes="text-center w-full"
        >
          <template #icon>
            <fa icon="list-alt" />
          </template>
        </MediumButtonWithIcon>
      </div>
      <MediumButtonWithIcon @button-click="onAddClick"
                            :text="$t('calendar.navbar.add.label')"
                            :margin-right-class-number="1"
                            class="w-full md:w-auto m-0-force"
                            button-classes="w-full md:w-auto calendar-view"
                            text-classes="text-center w-full"
      >
        <template #icon>
          <fa icon="plus" />
        </template>
      </MediumButtonWithIcon>
    </div>

  </div>
</template>

<script lang="ts">
import ViewMenu             from "@/views/Modules/Calendar/Schedules/Components/ViewMenu.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import moment from "moment";
export default {
  data(): ComponentData {
    return {
      isViewMenuOpen: false,
    }
  },
  props: {
    calendarInstance: {
      required: true,
    }
  },
  components: {
    ViewMenu,
    MediumButtonWithIcon
  },
  emits: [
    'viewChange'
  ],
  methods: {
    /**
     * @description changes the calendar view (month/week/day)
     */
    onViewChange(type: string): void {
      this.$emit('viewChange', type)
    },
    /**
     * @description check if the given element is the view change button
     */
    isViewSwitchButton(domElement): boolean {
      if (!domElement) {
        return false;
      }

      return domElement.classList.contains('calendar-view');
    },
    /**
     * @description when user clicks away from opened menu then hide it, but prevent
     *              hiding when user clicks on any element that is a part of the button
     */
    onViewMenuAwayClick(event: PointerEvent): void {
      let domElement = event.target as HTMLElement;

      if (this.isViewSwitchButton(domElement)) {
        return
      }

      if ("span" === domElement.nodeName.toLowerCase() && this.isViewSwitchButton(domElement.parentElement)) {
        return
      }

      if ("svg" === domElement.nodeName.toLowerCase() && this.isViewSwitchButton(domElement.parentElement.parentElement)) {
        return
      }

      if ("path" === domElement.nodeName.toLowerCase() && this.isViewSwitchButton(domElement.parentElement.parentElement.parentElement)) {
        return
      }

      this.isViewMenuOpen = false
    },
    /**
     * @description handle user clicking on "add", show the popup
     */
    onAddClick(): void {
      this.calendarInstance.openCreationPopup({
        start : moment().toDate(),
        end   : moment().add(1, "hours").toDate(),
      });
    }
  }
}
</script>