<script lang="ts">

import {ISchedule} from "tui-calendar";

export default {
  methods: {
    /**
     * @description takes backend data, and casts it to frontend structure
     */
    backendToFrontend(schedule: Record): ISchedule {
      return {
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
      };
    }
  }
}
</script>