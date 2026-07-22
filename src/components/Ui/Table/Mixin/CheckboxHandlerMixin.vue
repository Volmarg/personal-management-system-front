<script lang="ts">
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  methods: {
    /**
     * @description extracts the hashes of rows data, and builds an object containing state of checkboxes (if it's checked or not)
     *              this way there is one prop less that has to be passed down when defining an array component
     */
    checkboxesStateFromRowsHashes(hashes: Array<string>): Record<string, boolean> {
      if (ArrayTypeProcessor.isEmpty(hashes)) {
        return {};
      }

      let state = {};
      for (let hash of hashes) {
        state[hash] = true;
      }

      return state;
    },
    /**
     * @description updates an array with selected rows data, clears out deselected data
     */
    trackCheckedData(): void {
      // add new
      for (let rowData of this.rowsData) {
        let hash = rowData[0].rowUniqueHash;
        if (!Object.keys(this.checkboxesState).includes(hash) || !this.checkboxesState[hash] || this.checkboxesRowsData[hash]) {
          continue;
        }

        this.checkboxesRowsData[hash] = rowData;
      }

      // clear out old - we can do this ONLY for NON-backend-based pagination, since we don't have all the rows at once
      for (let checkedRowHash in this.checkboxesRowsData) {
        if (!Object.keys(this.checkboxesState).includes(checkedRowHash) || !this.checkboxesState[checkedRowHash]) {
          delete this.checkboxesRowsData[checkedRowHash];
        }
      }
    }
  }
}
</script>