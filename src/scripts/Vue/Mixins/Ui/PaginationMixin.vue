<script lang="ts">
import PaginationResultFilterConfigDTO from "@/scripts/Dto/Ui/PaginationResultFilterConfigDTO";

/**
 * Provides logic for pagination component
 */
export default {
  name: "PaginationMixin",
  methods: {
    /**
     * @description will return shown results filtered by pagination change
     */
    filterShownResultByPagination(dto: PaginationResultFilterConfigDTO) {
      let visibleResults = [] as Array<unknown>;
      let resultOffset   = (dto.currentPage-1) * dto.countOfResultsPerPage;

      let resultsCount = 0;
      for(let data of dto.dataArray){
        resultsCount++;

        if(resultsCount <= resultOffset){
          continue;
        }

        visibleResults.push(data);
        if(visibleResults.length >= dto.countOfResultsPerPage){
          break;
        }
      }

      return visibleResults as T;
    },
    /**
     * @description returns the index number based on provided data. Either returning the provided index or calculating
     *              the REAL index based on the pagination. This is especially needed for the paginated results,
     *              where the index is always between min-resultsPerPage on each page.
     */
    getPaginatedIndex(index: number, currentPage: number, resultsPerPage: number): number {
      if (index > resultsPerPage) {
        return index;
      }

      return index + (currentPage > 1 ? ((currentPage - 1) * resultsPerPage) : 0);
    }
  }
}
</script>