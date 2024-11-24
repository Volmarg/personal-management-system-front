<script lang="ts">

/**
 * @description example data source {[id:1, smth: 2, stuff: 3], [id: 2, smth: 3, stuff: 4]}
 *              example source config: {identifierName: id, identifierValue: 2, sourceValue: stuff}
 *              would yield "3", because searching for id=2, and then getting value of stuff
 */
type SourceConfig = {
  /**
   * @description will search for prop of this name in the array of source data
   */
  identifierName: string,
  /**
   * @description this is used to check if target prop has desired value
   */
  identifierValue: string,
  /**
   * @description this is field for which the value will be returned, or null if none is found
   */
  sourceValue: string,
}

export default {
  methods: {
    /**
     * @description provides the data based on source config and delivered data source array
     */
    getValueFromSource(sourceConfig: SourceConfig, dataSource: Array<Record>): unknown | null {
      let matchingData = dataSource.find((data: Record) => data[sourceConfig.identifierName] === sourceConfig.identifierValue);
      if (!matchingData) {
        return null;
      }

      return matchingData[sourceConfig.sourceValue] ?? null;
    }
  }
}

</script>