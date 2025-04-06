<script lang="ts">
import moment from "moment/moment";

import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";


import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      activeSortColumn: null,
      activeSortDirection: "asc",
    }
  },
  methods: {
    /**
     * @description sort the data on-fly - not the pretties logic, but won't probably be changed to much
     * > WARNING < there was already an attempt to call the `refresh` in component itself, rather than here,
     *             but here is the catch, flag is getting changed so fast that vue won't even trigger watcher...
     */
    handleSort(header: Record<string, unknown>, index: number): void {
      let isSorted = false;

      // this is correct, no need to sort here
      if (this.visibleResults.length === 0) {
        return;
      }

      // not supported for component based cols
      if (this.rowsData[0][index].isComponent) {
        return;
      }

      this.activeSortColumn = header.label;
      if (this.activeSortDirection === "desc") {
        if (this.shouldSortNumber(isSorted, index)){
          this.rowsData.sort((prev, next) => next[index].value - prev[index].value);
          isSorted = true;
        }

        if (this.shouldSortDate(isSorted, index)) {
          this.rowsData.sort((prev, next) => moment(next[index].value).valueOf() - moment(prev[index].value).valueOf());
          isSorted = true;
        }

        if (this.shouldSortString(isSorted, index)) {
          this.rowsData.sort((prev, next) => (next[index].value ?? "").localeCompare(prev[index].value ?? ""));
        }

        this.activeSortDirection = "asc";
        this.refresh(this.currentPage);
        return;
      }

      if (this.shouldSortNumber(isSorted, index)){
        this.rowsData.sort((prev, next) => prev[index].value - next[index].value);
        isSorted = true;
      }

      if (this.shouldSortDate(isSorted, index)) {
        this.rowsData.sort((prev, next) => moment(prev[index].value).valueOf() - moment(next[index].value).valueOf());
        isSorted = true;
      }

      if (this.shouldSortString(isSorted, index)) {
        this.rowsData.sort((prev, next) => (prev[index].value ?? "").localeCompare(next[index].value ?? ""));
      }

      this.activeSortDirection = "desc";
      this.refresh(this.currentPage);
    },
    /**
     * @description decide is string based sort should be handled
     */
    shouldSortString(isSorted: boolean, index: number): boolean {
      return !isSorted && (
             TypeChecker.isString(this.rowsData[0][index].value)
          || StringTypeProcessor.isEmptyString(this.rowsData[0][index].value, true, true)
      );
    },
    /**
     * @description decide if date sorting should be handled
     */
    shouldSortDate(isSorted: boolean, index: number): boolean {
      return !isSorted
          && (this.rowsData[0][index].value ?? "").match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/) && moment(this.rowsData[0][index].value).isValid();
    },
    /**
     * @description decide if number sorting should be handled
     */
    shouldSortNumber(isSorted: boolean, index: number): boolean {
      return !isSorted && TypeChecker.isNumber(this.rowsData[0][index].value);
    }
  }
}
</script>