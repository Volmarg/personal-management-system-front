<script lang="ts">
export default {
  methods: {
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