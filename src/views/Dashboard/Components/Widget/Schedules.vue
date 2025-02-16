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

      <Pagination :number-of-results="data.length"
                  :initial-current-page="currentPage"
                  :initial-count-of-result-per-page="resultsPerPage"
                  @page-number-changes="onPaginationChange"
                  class="mt-2"
      />
    </div>

    <NoResultsText v-if="data.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import Pagination          from "@/components/Ui/Pagination.vue";
import Badge               from "@/components/Ui/Badge/Badge.vue";

import PaginationMixin      from "@/scripts/Vue/Mixins/Ui/PaginationMixin.vue";
import DataTransformerMixin from "@/views/Modules/Calendar/Schedules/Mixin/DataTransformerMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import moment          from "moment/moment";
import {ISchedule}     from "tui-calendar";

export default {
  data(): ComponentData {
    return {
      currentPage: 1,
      resultsPerPage: 10,
      visibleSchedules: [],
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
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
    DataTransformerMixin,
  ],
  computed: {
    /**
     * @description returns schedules transformed into frontend ready structure
     */
    schedules(): Array {
      let schedules: Array<ISchedule> = [];
      for (let schedule of this.data) {
        schedules.push(this.backendToFrontend(schedule));
      }

      return schedules;
    },
  },
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
  },
  watch: {
    data: {
      deep: true,
      handler: function(): void {
        this.visibleSchedules = this.filterShownResultByPagination(this.currentPage, this.resultsPerPage, this.schedules);
      }
    }
  }
}
</script>