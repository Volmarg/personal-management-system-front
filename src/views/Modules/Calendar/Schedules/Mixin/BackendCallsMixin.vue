<script lang="ts">

import UtilsMixin from "@/views/Modules/Calendar/Schedules/Mixin/UtilsMixin.vue";

import FailedBackendResponseHandler from "@/scripts/Vue/Mixins/FailedBackendResponseHandler.vue";

import {ISchedule}     from "tui-calendar";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";
import {CalendarStore} from "@/scripts/Vue/Store/Module/Calendar/CalendarStore";
import moment          from "moment/moment";

export default {
  mixins: [
    UtilsMixin,
    FailedBackendResponseHandler,
  ],
  methods: {
    /**
     * @description will create new schedule
     */
    saveSchedule(scheduleData: ISchedule, ajaxCallUrl: string, method: string): void {
      let calendar = this.findCalendar(scheduleData.calendarId);

      // fixes the issue with dates being saved with incorrect offset due to timezone
      let startDate = moment(scheduleData.start.toDate()).format('Y-MM-DD HH:mm:ss.SSS Z');
      let endDate   = moment(scheduleData.end.toDate()).format('Y-MM-DD HH:mm:ss.SSS Z');

      let dataBag  = {
        body        : scheduleData.body,
        category    : scheduleData.isAllDay ? 'allday' : 'time',
        end         : endDate,
        start       : startDate,
        title       : scheduleData.title,
        location    : scheduleData.location,
        isAllDay    : scheduleData.isAllDay,
        calendarId  : calendar.id,
        reminders   : scheduleData.recurrenceRule,
      };

      this.$rootEvent.showFullPageLoader();
      this.$axios[method](ajaxCallUrl, dataBag)
          .then((response) => {
            this.$rootEvent.hideFullPageLoader();
            if (!this.handleFailedBackendResponse(response, ajaxCallUrl)) {
              return;
            }

            this.$rootEvent.showNotification(ToastTypeEnum.success, this.$t('calendar.tabs.schedules.msg.saved'));
            CalendarStore().getAll()
          }).catch( (reason) => {
            this.$rootEvent.hideFullPageLoader()
            throw {
              "message" : "Could not handle saving new schedule in database",
              "reason"  : reason,
            }
          })
    },
    /**
     * @description do delete the event
     */
    deleteSchedule(scheduleId: string, ajaxUrl: string): void {
      this.$rootEvent.showFullPageLoader()
      this.$axios.delete(ajaxUrl).then((response) => {
        this.$rootEvent.hideFullPageLoader();
        if (!this.handleFailedBackendResponse(response, ajaxUrl)) {
          return;
        }

        this.$rootEvent.showNotification(ToastTypeEnum.success, this.$t('calendar.tabs.schedules.msg.deleted'));
        CalendarStore().getAll()
      }).catch((reason) => {
        this.$rootEvent.hideFullPageLoader()
        throw {
          "message": "Could not handle deleting new schedule in database",
          "reason": reason,
        }
      });
    }
  }
}
</script>