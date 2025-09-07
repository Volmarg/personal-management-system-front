<template>
  <div class="simple-table">
    <div class="flex justify-end">
      <slot name="toltipStart"></slot>
      <SearchInput v-if="canSearch"
                   v-model.trim="searchValue"
      />
      <slot name="toltipEnd"></slot>
    </div>

    <Pagination :number-of-results="searchValue ? searchMatchingResults.length : rowsData.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationPageNumberChange"
                class="mt-2"
                v-if="navigationOnTop"
    />

    <div class="overflow-x-auto overflow-hidden"
         :class="{
            [tableDirectWrapperClasses]: true
         }"
    >
      <table class="table mt-2">
        <thead>
          <tr>
            <th v-for="(header, index) in headers"
                :key="index"
                class="font-bold uppercase cursor-pointer hover:opacity-80"
                :style="header.columnStyles"
                :class="{
                  'hidden': header.isVisible === false
                }"
                @click="handleSort(header, index)"
                :ref="buildHeaderRefName(index)"
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
                  'hidden': isColumnVisible(cellIndex),
                }"
            >

              <component v-if="cellData.isComponent"
                         :is="cellData.value"
                         v-bind.prop="{
                           ...cellData.componentProps,
                           rowData: rowData
                         }"
                         v-model="componentValues[cellData.uniqId]"
                         :ref="buildComponentRefName(cellData.uniqId)"
                         @update:model-value="$emit('update:componentModelValue', getComponentUpdateEventArgs(cellData, rowData, cellIndex, rowIndex))"
                         @change="$emit('componentValueChange', getComponentUpdateEventArgs(cellData, rowData, cellIndex, rowIndex))"
                         @action="$emit('action', {
                           originalEvent: $event,
                           rowNumber: rowIndex + (currentPage > 1 ? ((currentPage - 1) * resultsPerPage) : 0),
                         })"
              />
              <span v-else>
                <!-- this is VERY important, especially for passwords module, where the passwords should not be present in DOM! -->
                <span v-if="!isColumnVisible(cellIndex)"
                      class="break-all"
                      v-html="cellData.value"
                />
              </span>

              <p class="text-red-500 text-center mt-1">
                {{validationErrors[cellData.uniqId]}}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <Pagination :number-of-results="searchValue ? searchMatchingResults.length : rowsData.length"
                :initial-current-page="currentPage"
                :initial-count-of-result-per-page="resultsPerPage"
                @page-number-changes="onPaginationPageNumberChange"
                class="mt-2"
                v-if="!navigationOnTop"
    />
  </div>
</template>

<script lang="ts">
import TypeChecker          from "@/scripts/Core/Services/Types/TypeChecker";
import Logger               from "@/scripts/Core/Logger";
import ObjectValuesResolver from "@/scripts/Core/Services/Resolver/ObjectValuesResolver";
import BoolTypeProcessor    from "@/scripts/Core/Services/TypesProcessors/BoolTypeProcessor";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SearchInput from "@/components/Navigation/SearchInput.vue";
import Pagination  from "@/components/Ui/Pagination.vue";

import SortMixin           from "@/components/Ui/Table/Mixin/SortMixin.vue";
import VuelidateHandler    from "@/scripts/Vue/Mixins/VuelidateHandler.vue";
import RowAndCellDataMixin from "@/components/Ui/Table/Mixin/RowAndCellDataMixin.vue";

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
      /**
       * @description currently using it only for passing modelValue, it's needed because otherwise all values are valid v-model values
       */
      blockerValue: undefined,
      componentValues: {},
      searchValue: null,
      currentPage: 1,
      visibleResults: [],
      searchMatchingResults: [],
      validationErrors: {},
    }
  },
  props: {
    navigationOnTop: {
      type: Boolean,
      required: false,
      default: false
    },
    tableDirectWrapperClasses: {
      type: String,
      required: false,
      default: ''
    },
    overflowXAuto: {
      type: Boolean,
      required: false,
      default: true,
    },
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
     *      dataValidations     : "title.validations", > optional
     *    },
     *    {
     *      label               : "Status",           > required
     *      isVisible           : true,               > optional
     *      dataValuePath       : "icon.value",       > required
     *      dataRawValuePath    : "icon.rawValue",    > optional (becomes dataValuePath if not provided)
     *      dataIsComponentPath : "icon.isComponent", > required
     *      dataValidations     : "icon.validations", > optional
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
     *        value            : "Checkmark",                   > required
     *        isComponent      : true,                          > required
     *        componentProps   : {}                             > optional,
     *        validations      : [required]                     > optional (vuelidate validation rules),
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
    VuelidateHandler,
    RowAndCellDataMixin,
  ],
  emits: [
    /**
     * @description this is usable only if target component supports @change event
     */
    'componentValueChange',
    /**
     * @description this can be used if a target component does not support @change event, will listen to v-model update
     */
    'update:componentModelValue',
    'action'
  ],
  computed: {
    /**
     * @description will return table rows data
     *              - real cell values are resolved from data(prop) via provided properties in headers(prop)
     */
    rowsData(): Array<Array<Record<string, unknown>>> {
      let rowsData = [] as Array<Array<Record<string, unknown>>>;
      for (let rowIndex in this.data) {
        let element = this.data[rowIndex];

        let rowData = [] as Array<Record<string, unknown>>;
        for (let columnIndex in this.headers) {
          let header = this.headers[columnIndex];
          let keys = [
              header.dataValuePath,
              header.dataComponentModelValuePath,
              header.dataRawValuePath,
              header.dataIsComponentPath,
              header.dataComponentPropertiesPath,
              header.dataValidations,
          ];
          let resolvedValues      = ObjectValuesResolver.resolveKeysToValues(element.values, keys);
          let value               = resolvedValues[header.dataValuePath];
          let rawValue            = resolvedValues[header.dataRawValuePath] ?? value;
          let isComponent         = resolvedValues[header.dataIsComponentPath];
          let componentProps      = resolvedValues[header.dataComponentPropertiesPath] ?? null;
          let validations         = resolvedValues[header.dataValidations] ?? [];
          let componentModelValue = resolvedValues[header.dataComponentModelValuePath] ?? this.blockerValue;

          rowData.push({
            uniqId         : this.buildCellUniqueId(rowIndex, columnIndex),
            modelValue     : componentModelValue,
            fieldName      : header.label,
            fieldId        : header.dataValuePath?.split(".")[0] ?? null,
            value          : value,
            rawValue       : rawValue,
            isComponent    : isComponent,
            columnStyles   : String(header.columnStyles),
            componentProps : componentProps,
            validations    : validations,
            rowIndex       : rowIndex,
          })
        }

        rowsData.push(rowData);
      }

      return rowsData;
    },
    /**
     * @description check if components validated values are valid
     */
    areComponentsValuesValid(): boolean {
      return Object.keys(this.validationErrors).length === 0;
    }
  },
  methods: {
    /**
     * @description triggers cells validations on the component values
     */
    validateComponentsValues(): void {
      this.validationErrors = {};
      for (let cellsData of this.rowsData) {
        for (let cellData of cellsData) {
          let errors = this.validateValue(this.componentValues[cellData.uniqId], cellData.validations);

          if (errors.length > 0) {
            this.validationErrors[cellData.uniqId] = errors[0];
          }
        }
      }
    },
    /**
     * @description build and object for component update event, this data is propagated with event
     */
    getComponentUpdateEventArgs(cellData: Record<string, unknown>, rowData: Record<string, unknown>, cellIndex: string, rowIndex: number): Record<string, unknown> {
      let componentRefName = this.buildComponentRefName(cellData.uniqId);
      let headerRefName = this.buildHeaderRefName(cellIndex);

      return {
        value: this.componentValues[cellData.uniqId as string],
        component: this.$refs[componentRefName] ?? null,
        header: this.$refs[headerRefName] ?? null,
        cellData: cellData,
        rowData: rowData,
        cellNumber: cellIndex,
        rowNumber: this.getRowNumber(rowIndex),
        page: this.currentPage,
        resultsPerPage: this.resultsPerPage,
        tableId: this.id,
      };
    },
    /**
     * @description returns the row number based on provided data. Either returning the provided rowIndex or calculating
     *              the REAL row number based on the pagination. This is especially needed for the paginated results,
     *              where the row number is always between min-resultsPerPage on each page.
     */
    getRowNumber(rowIndex: number): number {
      if (rowIndex > this.resultsPerPage) {
        return rowIndex;
      }

      return rowIndex + (this.currentPage > 1 ? ((this.currentPage - 1) * this.resultsPerPage) : 0);
    },
    /**
     * @description will set the delivered model value to the component
     */
    setComponentModelValue(cellData: Record<string, unknown>): void {
      if (cellData.isComponent && cellData.modelValue !== this.blockerValue) {
        this.componentValues[cellData.uniqId] = cellData.modelValue;
        return;
      }

      this.componentValues[cellData.uniqId] = cellData.modelValue;
    },
    /**
     * @description checks if the column should be shown, by checking if the header related to given cellIndex is visible.
     */
    isColumnVisible(cellIndex: string): boolean {
      let headerRefName = this.buildHeaderRefName(cellIndex);
      return this.$refs[headerRefName][0].classList.contains('hidden');
    },
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
      this.searchMatchingResults = [];
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
          this.searchMatchingResults.push(oneRowData);
          return true;
        }

        if (TypeChecker.isNumber(cellData.value) && cellData.value.toString().includes(this.searchValue)){
          this.searchMatchingResults.push(oneRowData);
          return true;
        }

        if (TypeChecker.isBoolean(cellData.value) && cellData.value === BoolTypeProcessor.boolStringToRealBool(this.searchValue)) {
          this.searchMatchingResults.push(oneRowData);
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
    },
    /**
     * @description all values must be set initially else validation marks non-visible results as failed
     */
    initComponentValues(): void {
      for (let rowData of this.rowsData) {
        for (let cellData of rowData) {
          this.setComponentModelValue(cellData);
        }
      }
    }
  },
  created(): void {
    this.filterShownResults(this.currentPage, this.resultsPerPage);
  },
  watch: {
    searchValue(): void {
      this.currentPage = 1;
      this.refresh(this.currentPage);
    },
    data(): void {
      this.refresh(this.currentPage);
      this.initComponentValues();
    },
    visibleResults(): void {
      for (let rowData of this.visibleResults) {
        for (let cellData of rowData) {
          this.setComponentModelValue(cellData);
        }
      }
    }
  }
}
</script>

<style lang="scss">
.simple-table {
  ::-webkit-scrollbar:horizontal {
    height: 6px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    @apply bg-gray-300;
  }

  table {
    td {
      min-width: 200px;
      white-space: unset !important;
      word-break: break-all !important;
    }
  }
}
</style>