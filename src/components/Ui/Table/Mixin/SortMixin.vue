<script lang="ts">
import moment      from "moment/moment";
import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";

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
     */
    handleSort(header: Record<string, unknown>, index: number): void {
      let isSorted = false;

      if (this.visibleResults.length === 0) {
        return;
      }

      // not supported for component based cols
      if (this.visibleResults[0][index].isComponent) {
        return;
      }

      this.activeSortColumn = header.label;
      if (this.activeSortDirection === "desc") {
        if (!isSorted && TypeChecker.isNumber(this.visibleResults[0][index].value)){
          this.visibleResults.sort((prev, next) => next[index].value - prev[index].value);
          isSorted = true;
        }

        if (!isSorted && this.visibleResults[0][index].value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/) && moment(this.visibleResults[0][index].value).isValid()) {
          this.visibleResults.sort((prev, next) => moment(next[index].value).valueOf() - moment(prev[index].value).valueOf());
          isSorted = true;
        }

        if (!isSorted && TypeChecker.isString(this.visibleResults[0][index].value)) {
          this.visibleResults.sort((prev, next) => next[index].value.localeCompare(prev[index].value));
        }

        this.activeSortDirection = "asc";
        return;
      }

      if (!isSorted && TypeChecker.isNumber(this.visibleResults[0][index].value)){
        this.visibleResults.sort((prev, next) => prev[index].value - next[index].value);
        isSorted = true;
      }

      if (!isSorted && this.visibleResults[0][index].value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/) && moment(this.visibleResults[0][index].value).isValid()) {
        this.visibleResults.sort((prev, next) => moment(prev[index].value).valueOf() - moment(next[index].value).valueOf());
        isSorted = true;
      }

      if (!isSorted && TypeChecker.isString(this.visibleResults[0][index].value)) {
        this.visibleResults.sort((prev, next) => prev[index].value.localeCompare(next[index].value));
      }

      this.activeSortDirection = "desc";
    }
  }
}
</script>