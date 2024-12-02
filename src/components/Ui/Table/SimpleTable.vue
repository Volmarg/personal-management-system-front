<template>
  <div>
    <div class="flex justify-end">
      <SearchInput v-if="canSearch"
                   v-model.trim="searchValue"
      />
    </div>
    <table class="table mt-2">
      <thead>
        <tr>
          <th v-for="(header, index) in headers"
              :key="index"
              class="font-bold uppercase cursor-pointer hover:opacity-80"
              :class="{
                'hidden': header.isVisible === false
              }"
              @click="handleSort(header, index)"
              :ref="`header${index}`"
          >
            {{ header.label }}
            <span v-if="header.label === activeSortColumn">
              <span class="sort-arrow"
                    v-if="activeSortDirection === 'desc'"
              >
                <fa icon="sort-up" />
              </span>
              <span class="sort-arrow"
                    v-if="activeSortDirection === 'asc'"
              >
                <fa icon="sort-down" />
              </span>
            </span>

          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowData, rowIndex) in visibleResults"
            :key="rowIndex"
        >
          <!-- if header is hidden the hiding the column too -->
          <td v-for="(cellData, cellIndex) in rowData"
              :key="cellIndex"
              :class="{
                'hidden': $refs[`header${cellIndex}`][0].classList.contains('hidden'),
              }"
          >
            <!-- emitting event seems not to be working here -->
            <component v-if="cellData.isComponent"
                       :is="cellData.value"
                       v-bind.prop="{
                         ...cellData.componentProps,
                         rowData: rowData
                       }"
                       v-model="componentValues[`${cellData.uniqId}`]"
                       :ref="`component${cellData.uniqId}`"
                       @change="$emit('componentValueChange', {
                         value: componentValues[`${cellData.uniqId}`],
                         component: $refs[`component${cellData.uniqId}`] ?? null,
                         header: $refs[`header${cellIndex}`] ?? null,
                         cellData: cellData,
                         rowData: rowData,
                         cellNumber: cellIndex,
                         rowNumber: rowData.realRowId,
                         tableId: id,
                       })"
            />
            <span v-else>
              {{ cellData.value }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :number-of-results="rowsData.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationPageNumberChange"
                class="mt-2"
    />
  </div>
</template>

<script lang="ts">
import TypeChecker          from "@/scripts/Core/Services/Types/TypeChecker";
import Logger               from "@/scripts/Core/Logger";
import ObjectValuesResolver from "@/scripts/Core/Services/Resolver/ObjectValuesResolver";
import BoolTypeProcessor    from "@/scripts/Core/Services/TypesProcessors/BoolTypeProcessor";
import {ComponentData}      from "@/scripts/Vue/Types/Components/types";

import SearchInput from "@/components/Navigation/SearchInput.vue";
import Pagination  from "@/components/Ui/Pagination.vue";

import SortMixin from "@/components/Ui/Table/Mixin/SortMixin.vue";

/**
 * @description provides simple table
 * @warning     all of the extensive validations are needed because Vue is not recognizing types
 *              passed in prop, nor it allows using types on props so without it the props structure
 *              must be validated explicitly.
 *
 * @link https://vuejs.org/v2/guide/components-slots.html#Dynamic-Slot-Names - in case of need to provide slots for each cell
 */
export default {
  name: "SimpleTable",
  data(): ComponentData {
    return {
      componentValues: {},
      searchValue: null,
      currentPage: 1,
      visibleResults: [],
    }
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    canSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
    resultsPerPage: {
      type     : Number,
      required : false,
      default  : 10,
    },
    /**
     * @example
     * [
     *    {
     *      label               : "Job name",          > required
     *      isVisible           : false,               > optional
     *      dataValuePath       : "title.value",       > required
     *      dataRawValuePath    : "title.rawValue",    > optional (becomes dataValuePath if not provided)
     *      dataIsComponentPath : "title.isComponent", > required
     *    },
     *    {
     *      label               : "Status",           > required
     *      isVisible           : true,               > optional
     *      dataValuePath       : "icon.value",       > required
     *      dataRawValuePath    : "title.rawValue",   > optional (becomes dataValuePath if not provided)
     *      dataIsComponentPath : "icon.isComponent", > required
     * ]
     */
    headers: {
      type     : Array,
      required : true,
      validator(elements: Array<Record<string, unknown>>): boolean {
        let genericErrorCallback = () => {
          Logger.info("Validation for property `header` has failed, check it's description for more information.");
        }

        for (let element of elements) {
          if (TypeChecker.isUndefined(element.label)) {
            Logger.error("Element from `headers` is missing property `label`", {
              element: element
            });
            genericErrorCallback();
            return false;
          }

          if (TypeChecker.isUndefined(element.dataValuePath)) {
            Logger.error("Element from `headers` is missing property `dataValuePath`", {
              element: element
            });
            genericErrorCallback();
            return false;
          }

          if (TypeChecker.isUndefined(element.dataIsComponentPath)) {
            Logger.error("Element from `headers` is missing property `dataIsComponentPath`", {
              element: element
            });
            genericErrorCallback();
            return false;
          }

          if (TypeChecker.isUndefined(element.dataComponentPropertiesPath)) {
            Logger.error("Element from `headers` is missing property `dataComponentPropertiesPath`", {
              element: element
            });
            genericErrorCallback();
            return false;
          }
        }

        return true;
      }
    },
    /**
     * @description data used to build table rows
     * @example
     * [{
     *    values : {
     *      title : {
     *        value       : offerData.jobOffer.details.title, > required
     *        isComponent : false,                            > required
     *        isVisible   : false                             > optional
     *       },
     *      icon  : {
     *        value          : "Checkmark",                   > required
     *        isComponent    : true,                          > required
     *        componentProps : {}                             > optional
     *      },
     *     },
     *}]
     */
    data: {
      type     : Array,
      required : true,
      validator(elements: Array<Record<string, Record<string, Record<string, unknown>>>>): boolean {
        let genericErrorCallback = () => {
          Logger.info("Validation for property `data` has failed, check it's description for more information.");
        }

        for (let element of elements) {
          if (TypeChecker.isUndefined(element.values)) {
            Logger.error("Element from `data` is missing property `values`", {
              element: element
            });
            genericErrorCallback();
            return false;
          }

          if (!TypeChecker.isObject(element.values)) {
            Logger.error("Property called `values` from element of `data` property` is not an object!", {
              element: element
            });
            genericErrorCallback();
            return false;
          }

          for (let objectKey of Object.keys(element.values)) {
            let objectValue = element.values[objectKey];

            if (TypeChecker.isUndefined(objectValue.value)) {
              Logger.error("`values` property (object property) of an element in `data` property (vue property) is missing key `value`", {
                element     : element,
                objectValue : objectValue,
              });
              genericErrorCallback();
              return false;
            }

            if (TypeChecker.isUndefined(objectValue.isComponent)) {
              Logger.error("`values` property (object property) of an element in `data` property (vue property) is missing key `isComponent`", {
                element     : element,
                objectValue : objectValue,
              });
              genericErrorCallback();
              return false;
            }

            if (objectValue.isComponent && TypeChecker.isUndefined(objectValue.componentProps)) {
              Logger.error("Table element `data` property has incorrect structure", {
                reason      : "One of the element.value object is a component but that object is missing property `componentProps`",
                element     : element,
                objectValue : objectValue,
              });
              genericErrorCallback();
              return false;
            }

          }
        }

        return true;
      }
    }
  },
  components: {
    Pagination,
    SearchInput
  },
  mixins: [
    SortMixin,
  ],
  emits: [
    'componentValueChange'
  ],
  computed: {
    /**
     * @description will return table rows data
     *              - real cell values are resolved from data(prop) via provided properties in headers(prop)
     */
    rowsData(): Array<Array<Record<string, unknown>>> {
      let rowsData = [] as Array<Array<Record<string, unknown>>>;
      for (let rowId in this.data) {
        let element = this.data[rowId];

        let rowData = [] as Array<Record<string, unknown>>;
        for (let colId in this.headers) {
          let header = this.headers[colId];
          let keys = [
              header.dataValuePath,
              header.dataRawValuePath,
              header.dataIsComponentPath,
              header.dataComponentPropertiesPath,
          ];
          let resolvedValues = ObjectValuesResolver.resolveKeysToValues(element.values, keys);
          let value          = resolvedValues[header.dataValuePath];
          let rawValue       = resolvedValues[header.dataRawValuePath] ?? value;
          let isComponent    = resolvedValues[header.dataIsComponentPath];
          let componentProps = resolvedValues[header.dataComponentPropertiesPath] ?? null;

          rowData.push({
            uniqId         : `idx${rowId}${colId}`,
            fieldName      : header.label,
            fieldId        : header.dataValuePath?.split(".")[0] ?? null,
            value          : value,
            rawValue       : rawValue,
            isComponent    : isComponent,
            componentProps : componentProps
          })
        }

        rowsData.push(rowData);
      }

      return rowsData;
    }
  },
  methods: {
    /**
     * @description will handle the event when page number changes on pagination
     */
    onPaginationPageNumberChange(currentPage: number, countOfResultsPerPage: number): void {
      this.currentPage = currentPage;
      this.filterShownResults(currentPage, countOfResultsPerPage);
    },
    /**
     * @description will filter the results shown on page
     */
    filterShownResults(currentPage: number, countOfResultsPerPage: number, retryWithFirst: boolean = true): void {
      let visibleResults = [] as Array<unknown>;
      this.$nextTick( () => {
        let resultOffset = (currentPage-1) * countOfResultsPerPage;
        let resultsCount = 0;

        for (let rowData of this.rowsData) {
          resultsCount++;

          if (resultsCount <= resultOffset) {
            continue;
          }

          if (!this.matchesSearchValue(rowData)) {
            continue;
          }

          visibleResults.push(rowData);
          if (visibleResults.length >= countOfResultsPerPage) {
            break;
          }
        }

        if (visibleResults.length === 0 && retryWithFirst) {
          // would be better to do `curr--`, but then it's unknown how much data is passed, don't want to calculate this for now
          this.currentPage = 1;
          this.filterShownResults(1, countOfResultsPerPage, false)
        }

        this.visibleResults = visibleResults;
      })
    },
    /**
     * @description check if row data matches the search value
     */
    matchesSearchValue(oneRowData: Record<string, any>): boolean {
      if (!this.searchValue) {
        return true;
      }

      for (let cellData of oneRowData) {
        // components etc. are not supported in search
        if (!TypeChecker.isScalar(cellData.value)) {
          continue
        }

        if (TypeChecker.isString(cellData.value) && cellData.value.toLowerCase().includes(this.searchValue.toLowerCase())){
          return true;
        }

        if (TypeChecker.isNumber(cellData.value) && cellData.value.toString().includes(this.searchValue)){
          return true;
        }

        if (TypeChecker.isBoolean(cellData.value) && cellData.value === BoolTypeProcessor.boolStringToRealBool(this.searchValue)) {
          return true;
        }
      }

      // unknown situation, anyway if nothing was found in any cell then it's pretty much 'false'
      return false;
    },
    /**
     * @description refreshes the table data
     */
    refresh(pageNum: number): void {
      this.filterShownResults(pageNum, this.resultsPerPage);
    }
  },
  created(): void {
    this.filterShownResults(this.currentPage, this.resultsPerPage);
  },
  watch: {
    searchValue(): void {
      this.refresh(1);
    },
    data(): void {
      this.refresh(this.currentPage);
    }
  }
}
</script>