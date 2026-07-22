<script lang="ts">
type RowData = Array<Array<Record<string, unknown>>>;

import Md5Service         from "@/scripts/Core/Services/Crypto/Md5Service";
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  methods: {
    /**
     * @description creates hash string out of row data
     */
    hashRowData(hashableData: RowData): string {
      return Md5Service.hash(JSON.stringify(hashableData));
    },
    /**
     * @description Prepares row data for hashing. Some row data gets excluded in the hashing process, example:
     *              - rowIndex/uniqId: these can change depending on filters, sorting, etc.
     */
    rowDataToHashableData(rowData: RowData, excludedFields: Array<string> = [], hashedFields: Array<string> = []): RowData {
      let clonedData = [];
      for (let colData of rowData) {
        if (excludedFields.includes(colData.fieldId)) {
          continue;
        }

        if (!ArrayTypeProcessor.isEmpty(hashedFields) && !hashedFields.includes(colData.fieldId)) {
          continue;
        }

        let clonedColData = {...colData};
        clonedData.push({[clonedColData.fieldId]: clonedColData.value});
      }

      return clonedData;
    },
    buildCellUniqueId(rowId: string | number, colId: string | number): string {
      return `idx${rowId}${colId}`;
    },
    buildComponentRefName(cellUniqueId: string): string {
      return `component${cellUniqueId}`;
    },
    buildHeaderRefName(cellIndex: number): string {
      return `header${cellIndex}`;
    }
  }
}
</script>