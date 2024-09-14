<script lang="ts">

import UtilsMixin from "@/views/Modules/Calendar/Schedules/Mixin/UtilsMixin.vue";

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import Calendar, {ISchedule} from "tui-calendar";

export default {
  mixins: [
    UtilsMixin,
    FailedBackendResponseHandler,
  ],
  methods: {
    /**
     * @description will create new schedule
     */
    saveSchedule(scheduleData: ISchedule, ajaxCallUrl: string, createInstance: boolean = true): void {
      console.log("Calling saveSchedule with url: " + ajaxCallUrl);
      let calendar = this.findCalendar(scheduleData.calendarId);

      let startDate = scheduleData.start.toDate();
      let endDate   = scheduleData.end.toDate();

      let dataBag  = {
        title       : scheduleData.title,
        body        : scheduleData.body,
        isAllDay    : scheduleData.isAllDay,
        start       : startDate,
        end         : endDate,
        category    : scheduleData.isAllDay ? 'allday' : 'time',
        location    : scheduleData.location,
        calendarId  : calendar.id,
        reminders   : scheduleData.recurrenceRule,
      };

      // this.$rootEvent.showFullPageLoader();
      // this.$axios.post(ajaxCallUrl, dataBag)
      //     .then( (response) => {
      //       this.$rootEvent.hideFullPageLoader();
      //
      //       // this.handleFailedBackendResponse()
      //       // show notification on success
      //
      //       let usedScheduleId = ( ("undefined" === typeof scheduleData.id) ? ++this.lastUsedScheduleId : scheduleData.id);
      //
      //       var schedule = {
      //         id             : usedScheduleId.toString(),
      //         title          : scheduleData.title,
      //         body           : scheduleData.body,
      //         isAllDay       : scheduleData.isAllDay,
      //         start          : scheduleData.start,
      //         end            : scheduleData.end,
      //         category       : scheduleData.isAllDay ? 'allday' : 'time',
      //         location       : scheduleData.location,
      //         recurrenceRule : scheduleData.recurrenceRule,
      //
      //         calendarId  : calendar.id,
      //         color       : "#ffffff",
      //         bgColor     : calendar.bgColor,
      //         dragBgColor : calendar.bgColor,
      //         borderColor : calendar.borderColor,
      //       };
      //
      //       if (createInstance) {
      //         this.calendarInstance.createSchedules([schedule]);
      //       }
      //     })
      //     .catch( (reason) => {
      //       this.$rootEvent.hideFullPageLoader()
      //       throw {
      //         "message" : "Could not handle saving new schedule in database",
      //         "reason"  : reason,
      //       }
      //     })
    },
    /**
     * @description do delete the event
     */
    deleteSchedule(scheduleId: string): void {
      console.log("Calling deleteSchedule");
      // this.$rootEvent.showFullPageLoader()

      // todo: set proper url
      // this.$axios.get(`/modules/schedules/delete/${scheduleId}`).then( (response) => {
      //   this.$rootEvent.hideFullPageLoader()
      //   // this.handleFailedBackendResponse()
      //   // show notification on success
      // });
    }
  }
}
</script>