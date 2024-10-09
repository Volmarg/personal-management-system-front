<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.schedules.header')">
    <div class="flex flex-wrap flex-row justify-between">

      <div v-for="schedule in visibleSchedules"
           :key="JSON.stringify(schedule)"
           class="flex flex-row justify-between my-1 w-full hover:bg-gray-50 p-1"
      >

        <span>
          {{ schedule.title }} ({{ getFormattedStartDate(schedule.start) }})
        </span>

        <Badge :background-class="getBadgeColorClass(schedule.start)">
          {{ getDaysDiffFromNow(schedule.start)}} {{ $t('dashboard.widget.schedules.text.days') }}
        </Badge>

      </div>

      <Pagination :number-of-results="schedules.length"
                  :initial-current-page="currentPage"
                  :initial-count-of-result-per-page="resultsPerPage"
                  @page-number-changes="onPaginationChange"
                  class="mt-2"
      />
    </div>

    <NoResultsText v-if="schedules.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import Pagination          from "@/components/Ui/Pagination.vue";
import Badge               from "@/components/Ui/Badge/Badge.vue";

import PaginationMixin from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import moment          from "moment/moment";
import {ISchedule}     from "tui-calendar";

export default {
  data(): ComponentData {
    return {
      currentPage: 1,
      resultsPerPage: 2,
      visibleSchedules: [],
      /**
       * @description dummy data
       */
      schedules: [
        {
          id: 1,
          title: 'Test 1',
          location: "Some location 1",
          isAllDay: false,
          start: moment().add(-3, 'days').toISOString(),
          end: moment().add(45, 'minutes').toISOString(),
          goingDuration: 30,
          comingDuration: 30,
          color: '#FFFFFF',
          isVisible: true,
          bgColor: '#69BB2D',
          dragBgColor: '#69BB2D',
          borderColor: '#69BB2D',
          calendarId: 1,
          category: 'allday',
          dueDateClass: '',
          customStyle: 'cursor: default;',
          isPending: false,
          isFocused: false,
          isReadOnly: false,
          isPrivate: false,
          attendees: '',
          state: '',
          reminders: {"5":"2024-07-01 05:22:09","4":"2024-07-06 04:22:09","3":"2024-07-10 17:22:09","2":"2024-07-15 12:22:09"}
        },
        {
          id: 2,
          title: 'Test 2',
          location: "Some location 2",
          isAllDay: false,
          start: moment().toISOString(),
          end: moment().add(115, 'minutes').toISOString(),
          goingDuration: 30,
          comingDuration: 30,
          color: '#FFFFFF',
          isVisible: true,
          bgColor: 'red',
          dragBgColor: 'red',
          borderColor: 'red',
          calendarId: 2,
          category: 'time',
          dueDateClass: '',
          customStyle: 'cursor: default;',
          isPending: false,
          isFocused: false,
          isReadOnly: false,
          isPrivate: false,
          attendees: '',
          state: '',
          reminders: {"5":"2024-07-01 05:22:09","4":"2024-07-06 04:22:09","3":"2024-07-10 17:22:09","2":"2024-07-15 12:22:09"}
        },
        {
          id: 3,
          title: 'Test 3',
          location: "Some location 3",
          isAllDay: false,
          start: moment().add(10, 'days').toISOString(),
          end: moment().add(10, 'days').toISOString(),
          goingDuration: 30,
          comingDuration: 30,
          color: '#FFFFFF',
          isVisible: true,
          bgColor: 'red',
          dragBgColor: 'red',
          borderColor: 'red',
          calendarId: 3,
          category: 'time',
          dueDateClass: '',
          customStyle: 'cursor: default;',
          isPending: false,
          isFocused: false,
          isReadOnly: false,
          isPrivate: false,
          attendees: '',
          state: '',
          reminders: {"5":"2024-07-01 05:22:09","4":"2024-07-06 04:22:09","3":"2024-07-10 17:22:09","2":"2024-07-15 12:22:09"}
        },
        {
          id: 4,
          title: 'Test 4',
          location: "Some location 4",
          isAllDay: false,
          start: moment().add(90, 'days').toISOString(),
          end: moment().add(90, 'days').toISOString(),
          goingDuration: 30,
          comingDuration: 30,
          color: '#FFFFFF',
          isVisible: true,
          bgColor: 'red',
          dragBgColor: 'red',
          borderColor: 'red',
          calendarId: 3,
          category: 'time',
          dueDateClass: '',
          customStyle: 'cursor: default;',
          isPending: false,
          isFocused: false,
          isReadOnly: false,
          isPrivate: false,
          attendees: '',
          state: '',
          reminders: {"5":"2024-07-01 05:22:09","4":"2024-07-06 04:22:09","3":"2024-07-10 17:22:09","2":"2024-07-15 12:22:09"}
        },
        {
          id: 5,
          title: 'Test 5',
          location: "Some location 5",
          isAllDay: false,
          start: moment().add(35, 'days').toISOString(),
          end: moment().add(35, 'days').toISOString(),
          goingDuration: 30,
          comingDuration: 30,
          color: '#FFFFFF',
          isVisible: true,
          bgColor: 'red',
          dragBgColor: 'red',
          borderColor: 'red',
          calendarId: 3,
          category: 'time',
          dueDateClass: '',
          customStyle: 'cursor: default;',
          isPending: false,
          isFocused: false,
          isReadOnly: false,
          isPrivate: false,
          attendees: '',
          state: '',
          reminders: {"5":"2024-07-01 05:22:09","4":"2024-07-06 04:22:09","3":"2024-07-10 17:22:09","2":"2024-07-15 12:22:09"}
        }
      ] as Array<ISchedule>
    }
  },
  components: {
    Badge,
    Pagination,
    NoResultsText,
    BigDataDisplayBlock
  },
  mixins: [
    PaginationMixin,
  ],
  methods: {
    /**
     * @description get formatted start date that is easier to read
     */
    getFormattedStartDate(date: string): number {
      return moment(date).format("YYYY-MM-DD HH:MM:SS");
    },
    /**
     * @description get days diff between NOW and event start date
     */
    getDaysDiffFromNow(date: string): number {
      return moment(date).diff(moment(), 'days');
    },
    /**
     * @description returns the color of the badge based on how much in past / future the event is
     */
    getBadgeColorClass(date: string): string {
      let diff = this.getDaysDiffFromNow(date);
      if (diff >= 60) {
        return 'bg-blue-500';
      } else if (diff >= 30) {
        return 'bg-orange-500';
      } else if (diff >= 0) {
        return 'bg-red-500';
      }
      return 'bg-black';
    },
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationChange(currentPage: number, countOfResultsPerPage: number): void {
      this.currentPage      = currentPage;
      this.visibleSchedules = this.filterShownResultByPagination(currentPage, countOfResultsPerPage, this.schedules);
    },
  },
  mounted(): void {
    this.visibleSchedules = this.filterShownResultByPagination(this.currentPage, this.resultsPerPage, this.schedules);
  }
}
</script>