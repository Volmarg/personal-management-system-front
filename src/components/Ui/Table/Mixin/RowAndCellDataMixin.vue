<script lang="ts">

import Md5Service         from "@/scripts/Core/Services/Crypto/Md5Service";
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

export default {
  methods: {
    /**
     * @description creates hash string out of row data. Some row data gets excluded in the hashing process, example:
     *              - rowIndex/uniqId: these can change depending on filters, sorting, etc.
     */
    hashRowData(rowData: Array<Array<Record<string, unknown>>>, excludedFields: Array<string> = [], hashedFields: Array<string> = []): string {
      let clonedData = [];
      for (let colData of rowData) {
        if (excludedFields.includes(colData.fieldId)) {
          continue;
        }

        if (!ArrayTypeProcessor.isEmpty(hashedFields) && !hashedFields.includes(colData.fieldId)) {
          continue;
        }

        let clonedColData = {...colData};

        delete clonedColData['rowIndex'];
        delete clonedColData['uniqId'];

        clonedData.push(clonedColData);
      }

      return Md5Service.hash(JSON.stringify(clonedData));
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