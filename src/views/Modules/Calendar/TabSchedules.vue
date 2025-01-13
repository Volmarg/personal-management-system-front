<template>
  <p class="text-xl mt-2 mb-10">{{getDateRangeInfo()}}</p>
  <div class="w-full flex justify-end">
    <div class="mt-6 mb-4 w-full md:w-1/2 lg:w-1/4">
      <ScheduleSelect :schedules="visibleSchedules"
                      v-model="selectedScheduleId"
                      ref="scheduleSelect"
      />
    </div>
  </div>

  <Navbar :calendar-instance="calendarInstance"
          @view-change="onViewChange"
  />

  <div class="flex flex-row justify-between pt-10">
    <CalendarList @calendar-filter="onCalendarFilter"
                  :calendars-data="calendarsData"
    />

    <div class="w-full">
      <div id="calendar"/>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar         from "@/views/Modules/Calendar/Schedules/Components/Navbar.vue";
import CalendarList   from "@/views/Modules/Calendar/Schedules/Components/CalendarList.vue";
import ScheduleSelect from "@/views/Modules/Calendar/Schedules/Components/ScheduleSelect.vue";

import UtilsMixin       from "@/views/Modules/Calendar/Schedules/Mixin/UtilsMixin.vue";
import EventsMixin      from "@/views/Modules/Calendar/Schedules/Mixin/EventsMixin.vue";
import DetailPopupMixin from "@/views/Modules/Calendar/Schedules/Mixin/DetailPopupMixin.vue";

import * as Calendar from "tui-calendar";

import {ComponentData}                      from "@/scripts/Vue/Types/Components/types";
import {ICalendarInfo, IOptions, ISchedule} from "tui-calendar";

import moment from "moment";
import Logger from "@/scripts/Core/Logger";

/**
 * @description Calendar is based on the ToastUi
 * @link https://ui.toast.com/tui-calendar
 * @link https://nhn.github.io/tui.calendar/latest/tutorial-15-template-popup
 * @link https://codepen.io/AnzilkhaN/pen/GRJqPVK
 */
export default {
  data(): ComponentData {
    return {
      defaultView: 'week',
      selectedScheduleId: null,
      calendarInstance: null,
      visibleSchedules: [],
    }
  },
  props: {
    calendarsData: {
      type: Array,
      required: true,
    }
  },
  components: {
    ScheduleSelect,
    CalendarList,
    Navbar,
  },
  mixins: [
    UtilsMixin,
    EventsMixin,
    DetailPopupMixin
  ],
  computed: {
    /**
     * @description returns all the schedules across all the calendars
     */
    schedules(): Array {
      let schedules: Array<ISchedule> = [];
      for (let calendar of this.calendarsData) {
        for (let schedule of calendar.schedules) {
          schedules.push({
            id: schedule.id,
            title: schedule.title,
            body: schedule.body,
            location: schedule.location,
            isAllDay:schedule.isAllDay,
            start:schedule.start,
            end:schedule.end,
            goingDuration: schedule.goingDuration,
            comingDuration: schedule.comingDuration,
            color: schedule.color,
            isVisible: schedule.isVisible,
            bgColor: schedule.bgColor,
            dragBgColor: schedule.dragBgColor,
            borderColor: schedule.borderColor,
            calendarId: schedule.calendarId,
            category: schedule.category,
            dueDateClass: schedule.dueDateClass,
            customStyle: schedule.customStyle,
            isPending: schedule.isPending,
            isFocused: schedule.isFocused,
            isReadOnly: schedule.isReadOnly,
            isPrivate: schedule.isPrivate,
            attendees: schedule.attendees,
            state: schedule.state,
            reminders: schedule.reminders
          })
        }
      }
      return schedules;
    }
  },
  methods: {
    /**
     * @description builds the visible date range string - based on selected view
     */
    getDateRangeInfo(): string {
      if (!this.calendarInstance) {
        return '';
      }

      if ("month" === this.calendarInstance.getViewName()) {
        let momentDate = moment(this.calendarInstance.getDate().toDate().toDateString());

        return `${momentDate.format("MMMM")} ${momentDate.format("YYYY")}`;
      }

      if ("week" === this.calendarInstance.getViewName()) {
        let momentStartDate = moment(this.calendarInstance.getDateRangeStart().toDate().toDateString());
        let momentEndDate = moment(this.calendarInstance.getDateRangeEnd().toDate());

        return `${momentStartDate.format("DD MMMM YYYY")} - ${momentEndDate.format("DD MMMM YYYY")}`;
      }

      let currentDateMoment = moment(this.calendarInstance.getDate().toDate().toDateString());

      return currentDateMoment.format("dddd DD - MMMM YYYY");
    },
    /**
     * @description Changes the view. There is a known problem around community that switching view is not preserving
     *              calendar data thus it breaks the popups / clicks etc. The only working solution that i found myself
     *              is to destroy the instance and recreate it each time the view changes.
     *
     *              Not nice, can cause loosing data etc. but there is nothing else that can be done about that.
     *
     *              Theoretically everything should be fine, if saving / loading / data storing etc. is handled properly.
     */
    onViewChange(type: string): void {
      let currDate = this.calendarInstance.getDate();
      this.calendarInstance.destroy();
      this.initCalendar()
      this.applyEvents();
      this.setSchedules();
      this.setCalendars();
      this.calendarInstance.changeView(type, true);
      this.modifyDetailPopup();
      this.calendarInstance.setDate(currDate);
    },
    /**
     * @description set schedules in calendar
     */
    setSchedules(): void {
      for (let schedule of this.schedules) {
        schedule.recurrenceRule = this.remindersDatesAsString(schedule.reminders);
      }

      this.calendarInstance.createSchedules(this.schedules);
    },
    /**
     * @description toggle the calendar visibility
     */
    onCalendarFilter(data: Record): void {
      this.calendarInstance.toggleSchedules(data.id, !data.isChecked, true);
      this.visibleSchedules = this.getAllSchedules(true);
    },
    /**
     * @description will initialise the calendar, contains the calendar configuration
     */
    initCalendar(): void {
      this.calendarInstance = new Calendar('#calendar', {
        defaultView: this.defaultView,
        taskView: false,
        scheduleView: true,
        useCreationPopup: true,
        useFormPopup: true,
        useDetailPopup: true,
        week: {
          startDayOfWeek: 1
        },
        month: {
          startDayOfWeek: 1
        },
      } as IOptions);
    },
    /**
     * @description sets the calendars
     */
    setCalendars(): void {
      let calendarsData = [] as Array<ICalendarInfo>;
      for (let calendar of this.calendarsData) {
        calendarsData.push({
          id          : calendar.id,
          bgColor     : calendar.color,
          borderColor : calendar.color,
          dragBgColor : calendar.color,
          color       : calendar.color,
          name        : calendar.name,
        });
      }
      this.calendarInstance.setCalendars(calendarsData);
    }
  },
  mounted(): void {
    this.initCalendar();
    this.modifyDetailPopup();
    this.applyEvents();
    this.setLastUsedScheduleId();

    // this is fishy but else calendar events can't access view component so...
    window.calendarView = this;
  },
  watch: {
    /**
     * @description known issues:
     *              - Code side issue. Because of this logic in here, if You add something in code, the calendar / filters etc.
     *                data will be wiped. Calendar works itself, it's just what it is - how the calendar works. This is not a problem
     *                for user, but rather for dev. You just need to reload the page whenever You change something somewhere in code.
     *                Theoretically in future if it's an issue, could add a button for DEV role "reload calendar".
     */
    calendarsData: {
      deep: true,
      handler: function (): void {
        if (this.calendarInstance) {
          let currDate = this.calendarInstance.getDate();

          this.calendarInstance.destroy();
          this.initCalendar();
          this.modifyDetailPopup();
          this.applyEvents();
          this.setSchedules();
          this.setCalendars();
          this.setLastUsedScheduleId();
          this.visibleSchedules = this.getAllSchedules(true)
          this.calendarInstance.setDate(currDate);
        }
      }
    },
    selectedScheduleId(): void {
      if (!this.selectedScheduleId) {
        return;
      }

      let schedule = this.findSchedule(this.selectedScheduleId);
      if (!schedule) {
        Logger.error(`No schedule for this id: ${this.selectedScheduleId}`)
        return;
      }

      this.onViewChange('week');

      // same as below, fishy solution, but got no other choice
      setTimeout(() => {
        this.calendarInstance.setDate(schedule.start._date);
      }, 300)

      // a bit of hacky and hoping it just works, got no other way to solve this out,
      setTimeout(() => {
        this.markScheduleInCalendar(schedule);
      }, 500)

      /**
       * @description first of all using v-model prop is causing an error, thus using ref method to clear the select
       *              second is that the calendar gets broken if something is selected and You start changing calendars
       *              visibility. Found out that without anything selected in search, everything works fine, so
       *              first using select to navigate to schedule then clearing it out, and things are just working fine.
       */
      this.$refs.scheduleSelect.clear();
    }
  }
}
</script>

<style lang="scss">
@import 'tui-calendar/dist/tui-calendar.css';
@import 'tui-date-picker/dist/tui-date-picker.css';
@import 'tui-time-picker/dist/tui-time-picker.css';

.tui-full-calendar-time-schedule-content-time,
.tui-full-calendar-time-schedule-content-travel-time,
.tui-full-calendar-month-more-allday
{
  color: #ffffff !important;
}

.tui-full-calendar-weekday-schedule-title {
  @apply text-left
}
</style>