<script lang="ts">
/**
 * Provides logic for pagination component
 */
export default {
  name: "PaginationMixin",
  methods: {
    /**
     * @description will return shown results filtered by pagination change
     * @param dataArray - this allows to provide array which will be used to get visible results offer from
     * @param currentPage
     * @param countOfResultsPerPage
     */
    filterShownResultByPagination<T extends Array<unknown>>(currentPage: number, countOfResultsPerPage: number, dataArray: T): T {
      let visibleResults = [] as Array<unknown>;
      let resultOffset   = (currentPage-1) * countOfResultsPerPage;

      let numberOfCard = 0;
      for(let data of dataArray){
        numberOfCard++;

        if(numberOfCard <= resultOffset){
          continue;
        }

        visibleResults.push(data);
        if(visibleResults.length >= countOfResultsPerPage){
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