<script lang="ts">
export default {
  methods: {
    /**
     * @description updates an array with selected rows data, clears out deselected data
     */
    trackCheckedData(): void {
      // add new
      for (let rowData of this.rowsData) {
        let rowIndex = this.getRowNumber(rowData[0].rowIndex);
        if (!Object.keys(this.checkboxesState).includes(rowIndex) || !this.checkboxesState[rowIndex] || this.checkedRowsData[rowIndex]) {
          continue;
        }

        this.checkedRowsData[rowIndex] = rowData;
      }

      // clear out old - must be done this way, especially in case of backend-based pagination data
      for (let checkedRowIndex in this.checkedRowsData) {
        if (!Object.keys(this.checkboxesState).includes(checkedRowIndex) || !this.checkboxesState[checkedRowIndex]) {
          delete this.checkedRowsData[checkedRowIndex];
        }
      }
    }
  }
}
</script>