<script lang="ts">

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import UtilsMixin        from "@/views/Modules/Calendar/Schedules/Mixin/UtilsMixin.vue";
import BackendCallsMixin from "@/views/Modules/Calendar/Schedules/Mixin/BackendCallsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {ISchedule}     from "tui-calendar";

/**
 * @description most of this code is a pure madness extracted from PMS legacy,
 *              adjusted to make it just work for vue implementation
 */
export default {
  data(): ComponentData {
    return {
      lastSearchedSchedule: null as null | ISchedule,
      lastClickedScheduleId: 0
    }
  },
  mixins: [
    UtilsMixin,
    BackendCallsMixin,
  ],
  methods: {
    /**
     * @description returns all schedules from calendar
     */
    applyEvents(): void {
      this.calendarInstance.on({
        beforeCreateSchedule: this.beforeCreateSchedule,
        beforeUpdateSchedule: this.beforeUpdateSchedule,
        beforeDeleteSchedule: this.beforeDeleteSchedule,
        afterRenderSchedule: this.afterRenderSchedule,
        clickSchedule: this.clickSchedule,
      });
    },
    /**
     * @description handles the case when the schedule is created upon click
     */
    beforeCreateSchedule: (schedule) => {
      let ajaxCallUrl = '/modules/schedules/save-schedule';

      let popupContainer = document.querySelector('.tui-full-calendar-popup-container');
      if (popupContainer) {
        let allRemindersArray = window.calendarView.getAllRemindersArrayFromCreationPopup();

        schedule.body           = popupContainer.querySelector('#body').getAttribute('value') as string;
        schedule.recurrenceRule = allRemindersArray.join(",");
      }

      window.calendarView.saveSchedule(schedule, ajaxCallUrl, window.calendarView.lastClickedScheduleId);
      window.calendarView.lastClickedScheduleId = null;
    },
    /**
     * @description handles updating the calendar like for example via drag n drop
     *              some of the attributes are custom-made, therefore standard update
     *              is not working on them
     */
    beforeUpdateSchedule: (event) => {
      let creationPopupContainer = document.querySelector('.tui-full-calendar-popup-container');
      let ajaxCallUrl            = `/modules/schedules/save-schedule/${event.schedule.id}`;
      let changes                = event.changes;

      // no changes in standard properties
      if (null === changes) {
        changes = {};
      }

      changes.body = event.schedule.body;
      if (creationPopupContainer) {
        changes.body = creationPopupContainer.querySelector('#body').getAttribute('value') as string;

        let allRemindersArray = window.calendarView.getAllRemindersArrayFromCreationPopup();
        changes.recurrenceRule = allRemindersArray.join(",");
      }

      /**
       * @description this must be done on this step as calendar is using internally the `changes` to update elements,
       *              these are also used later to update data in DB, there is also bug in the plugin
       *              itself, meaning that when calendar gets updated, the drag color is not updated until calendar
       *              or schedule will be fully reloaded, but this is not implemented in here
       */
      if (!StringTypeProcessor.isEmptyString(event.changes.calendarId)) {
        let calendar        = window.calendarView.findCalendar(event.changes.calendarId);
        changes.color       = window.calendarView.SCHEDULE_DEFAULT_TEXT_COLOR;
        changes.bgColor     = calendar.bgColor;
        changes.dragBgColor = calendar.dragBgColor;
        changes.borderColor = calendar.borderColor;
      }

      let updatedSchedule = window.calendarView.buildUpdatedSchedule(event.schedule, changes);

      window.calendarView.calendarInstance.deleteSchedule(event.schedule.id, event.schedule.calendarId);
      window.calendarView.saveSchedule(updatedSchedule, ajaxCallUrl);
      window.calendarView.lastClickedScheduleId = null;
    },
    /**
     * @description handles removal of schedule
     */
    beforeDeleteSchedule: (event) => {
      window.calendarView.deleteSchedule(event.schedule.id);
      window.calendarView.calendarInstance.deleteSchedule(event.schedule.id, event.schedule.calendarId);
      window.calendarView.lastClickedScheduleId = null;
    },
    /**
     * @description handles clicking on the schedule
     */
    clickSchedule: (event) => {
      let previousClickedScheduleId = window.calendarView.lastClickedScheduleId;
      window.calendarView.lastClickedScheduleId = event.schedule.id;
      window.calendarView.markScheduleInCalendar(event.schedule, previousClickedScheduleId);
    },
    /**
     * @description calendar is rendered, triggers also upon changing view or clicking next / previous etc.
     *              - but keep in mind that this is triggered for every single schedule visible
     *              in the grid so for 50 this gets called 50 times
     */
    afterRenderSchedule: (event) => {
      if (null !== window.calendarView.lastSearchedSchedule && event.schedule.id == window.calendarView.lastSearchedSchedule.id) {
        // there is no need to unmark since on each search the grid is being loaded anew
        window.calendarView.markScheduleInCalendar(window.calendarView.lastSearchedSchedule, window.calendarView.lastClickedScheduleId);
        window.calendarView.scrollToScheduleInCalendar(window.calendarView.lastSearchedSchedule);
      }
    }
  }
}
</script>