<script lang="ts">
export default {
  methods: {
    /**
     * @description extracts the selected files ids out of the selected files data
     */
    getSelectedFilesIds(selectedFilesData: Array<Record<string, string | number>>): Array<string | number> {
      return selectedFilesData.map((data) => data.id);
    }
  }
}
</script>