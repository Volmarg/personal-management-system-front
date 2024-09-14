<script lang="ts">
import {ICalendarInfo, ISchedule} from "tui-calendar";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  data(): ComponentData {
    return {
      lastUsedScheduleId: 0,
    }
  },
  methods: {
    /**
     * @description sets last used schedule id
     */
    setLastUsedScheduleId(): void {
      //@ts-ignore
      let allSchedules = this.getAllSchedules();
      if (0 === allSchedules.length) {
        return;
      }

      for (let scheduleIndex in allSchedules) {
        let schedule = allSchedules[scheduleIndex];
        let scheduleId = parseInt(schedule.id)

        if (this.lastUsedScheduleId < scheduleId) {
          this.lastUsedScheduleId = scheduleId;
        }
      }
    },
    /**
     * @description will mark schedule in calendar
     */
    markScheduleInCalendar(schedule: ISchedule, previousClickedScheduleId: number | null): void {
      document.querySelector(`[data-schedule-id='${schedule.id}']`).classList.add("schedule-mark");
      if (previousClickedScheduleId) {
        this.unmarkScheduleInCalendar(previousClickedScheduleId);
      }
    },
    /**
     * @description will unmark schedule of given id
     */
    unmarkScheduleInCalendar(scheduleId: number): void {
      document.querySelector(`[data-schedule-id='${scheduleId}']`).classList.remove("schedule-mark");
    },
    /**
     * @description scrolls into schedule
     */
    scrollToScheduleInCalendar(schedule: ISchedule): void {
      document.querySelector(`[data-schedule-id='${schedule.id}']`).scrollIntoView();
    },
    /**
     * @description find schedule of given id, return the schedule or null if match is not found
     */
    findSchedule(scheduleId: string): ISchedule | null {
      let allSchedulesInInstance = this.getAllSchedules();
      let foundSchedule = null;
      let schedulesArray = Object.values(allSchedulesInInstance);

      for (let schedule of schedulesArray) {
        if (schedule.id === scheduleId) {
          foundSchedule = schedule;
        }
      }

      return foundSchedule;
    },
    /**
     * @description returns all schedules
     */
    getAllSchedules(onlyVisible: boolean = false): Array<ISchedule> {
      let allSchedules = this.calendarInstance._controller.schedules.items;
      let usedSchedules = [];
      if (onlyVisible) {
        for (let schedule of Object.values({...allSchedules})) {
          if (schedule.isVisible) {
            usedSchedules.push(schedule)
          }
        }
      } else {
        usedSchedules = allSchedules;
      }

      return usedSchedules;
    },
    /**
     * @description will return all reminders array from creation popup
     */
    getAllRemindersArrayFromCreationPopup(): Array<any> {
      let creationPopupContainer = document.querySelector('.tui-full-calendar-popup-container');
      if (!creationPopupContainer) {
        throw {"message": "Cannot get remindersArray from the popup as the popup is not present!"}
      }

      let allInputReminders = document.querySelectorAll('.reminder-calendar');
      let allRemindersArray = [];
      for (let input of allInputReminders) {
        /**
         * @description skip empty fields and ignore duplicates
         */
        if (!StringTypeProcessor.isEmptyString(input.value) && !ArrayTypeProcessor.findFirstByValue(input.value, allRemindersArray)) {
          allRemindersArray.push(input.value)
        }
      }

      return allRemindersArray;
    },
    /**
     * @description will search for defined ICalendar with given id in given Calendar instance
     */
    findCalendar(searchedCalendarId: string): ICalendarInfo | null {
      let allCalendarsInInstance = this.calendarInstance._controller.calendars;
      let foundCalendar = null;

      allCalendarsInInstance.forEach(function (calendar) {
        if (calendar.id === searchedCalendarId) {
          foundCalendar = calendar;
          return;
        }
      });

      return foundCalendar;
    },
    /**
     * @description The schedule update event consist of schedule and object of changes, this method combines both and outputs
     *              the schedule with applied changes on it.
     */
    buildUpdatedSchedule(schedule: ISchedule, changes): ISchedule
    {
      return {
        id              : ("undefined" === typeof changes.id             ) ? schedule.id             : changes.id,
        title           : ("undefined" === typeof changes.title          ) ? schedule.title          : changes.title,
        body            : ("undefined" === typeof changes.body           ) ? schedule.body           : changes.body,
        isAllDay        : ("undefined" === typeof changes.isAllDay       ) ? schedule.isAllDay       : changes.isAllDay,
        start           : ("undefined" === typeof changes.start          ) ? schedule.start          : changes.start,
        end             : ("undefined" === typeof changes.end            ) ? schedule.end            : changes.end,
        category        : ("undefined" === typeof changes.category       ) ? schedule.category       : changes.category,
        location        : ("undefined" === typeof changes.location       ) ? schedule.location       : changes.location,
        calendarId      : ("undefined" === typeof changes.calendarId     ) ? schedule.calendarId     : changes.calendarId,
        color           : ("undefined" === typeof changes.color          ) ? schedule.color          : changes.color,
        bgColor         : ("undefined" === typeof changes.bgColor        ) ? schedule.bgColor        : changes.bgColor,
        dragBgColor     : ("undefined" === typeof changes.dragBgColor    ) ? schedule.dragBgColor    : changes.dragBgColor,
        borderColor     : ("undefined" === typeof changes.borderColor    ) ? schedule.borderColor    : changes.borderColor,
        recurrenceRule  : ("undefined" === typeof changes.recurrenceRule ) ? schedule.recurrenceRule : changes.recurrenceRule,
      };
    }
  },
}
</script>

<style lang="scss">
.schedule-mark {
  @apply animate-pulse
}
</style>