<template>
  <Base :is-in-container="false">
    <h2 class="text-md font-bold text-left -mt-7 ml-2"> > {{ $t('search.resultsPage.subHeader.query') }} {{ query }}</h2>
    <h2 class="text-md font-bold text-left -mt-3 ml-2"> > {{ $t('search.resultsPage.subHeader.tags') }}</h2>

    <div class="mt-2 mb-10 flex flex-row">
      <Badge v-for="variant in queryWordsVariants"
             :key="variant"
             class="ml-1"
      >
        {{ variant }}
      </Badge>
    </div>

      <div v-for="(moduleResults, moduleId) in searchResults"
           :key="JSON.stringify(moduleResults)"
      >

        <Accordion class="important-information-accordion"
                   v-if="moduleResults.length > 0"
        >
          <AccordionPanel class="accordion-panel">
            <template #title>
              <fa :icon="moduleIconName(moduleId)" /> {{ moduleName(moduleId) }}
            </template>
            <template #content>
              <div class="flex flex-wrap flex-row gap-4">

                <!-- single result -->
                <div v-for="singleResult in moduleResults"
                     :key="JSON.stringify(singleResult)"
                     class="mb-5 single-result"
                     v-tippy="{
                       content: $t('search.resultsPage.singleResult.text.hover'),
                       placement: 'top',
                     }"
                     @click="onResultClick(singleResult, moduleId)"
                >

                  <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                    <div class="flex flex-row items-center justify-between">
                      <div class="flex flex-col">
                        <div class="text-sm text-left text-gray-500">
                          <span class="font-bold">{{ $t('search.resultsPage.singleResult.text.id') }}</span>
                          <span>{{ getIdentifier(singleResult, moduleId) }}</span>
                        </div>
                        <div class="text-md text-left font-bold">{{ getName(singleResult) }}</div>
                      </div>
                      <slot name="icon"></slot>
                    </div>
                  </div>

                </div>
              </div>
            </template>
          </AccordionPanel>
        </Accordion>

      </div>

    <div v-if="!hasAnyResults">
      <NoResultsText />
    </div>
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Badge from "@/components/Ui/Badge/Badge.vue";
import Base  from "@/views/Modules/Base.vue";

import NoResultsText    from "@/components/Page/NoResultsText.vue";
import Accordion        from "@/components/Ui/Accordion/Accordion.vue";
import AccordionPanel   from "@/components/Ui/Accordion/Panel.vue";

import ModuleBaseDataMixin from "@/mixins/Modules/ModuleBaseDataMixin.vue";

import ArrayTypeProcessor  from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";
import BaseError           from "@/scripts/Core/Error/BaseError";
import TypeChecker         from "@/scripts/Core/Services/Types/TypeChecker";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";
import WindowService       from "@/scripts/Core/Services/WindowService";
import VueRouterStorage    from "@/router/Modules/VueRouterStorage";
import SymfonySystemRoutes from "@/router/SymfonyRoutes/Modules/SymfonySystemRoutes";
import {StorageTypeEnum}   from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  data(): ComponentData {
    return {
      config: {
        identifier: {
          maxLen: 45
        },
        name: {
          maxLen: 38
        }
      },
      searchResults: {},
    }
  },
  components: {
    AccordionPanel,
    NoResultsText,
    Accordion,
    Badge,
    Base,
  },
  mixins: [
    ModuleBaseDataMixin,
  ],
  computed: {
    /**
     * @description searched query
     */
    query(): string {
      return this.$route.query.query;
    },
    /**
     * @description returns array of all variants of in-query words
     */
    queryWordsVariants(): Array<string> {
      // else logout throws internal error
      if (!this.query) {
        return [];
      }

      let splitWords = this.query.split(" ");
      let arrayOfCombinations = ArrayTypeProcessor.getStringCombinations(splitWords);

      let combinations = [];
      for (let combination of arrayOfCombinations) {
        combinations.push(combination.join(" "));
      }

      return combinations.filter(Boolean);
    },
    /**
     * @description check if there are any search results returned
     */
    hasAnyResults(): boolean {
      for (let moduleName of Object.keys(this.searchResults)) {
        console.log(this.searchResults[moduleName]);
        if (this.searchResults[moduleName].length > 0) {
          return true;
        }
      }

      return false;
    }
  },
  methods: {
    /**
     * @description returns the single search result name, if it's too long then reduced string is returned
     */
    getName(singleResult: Record): string | number {
      if (TypeChecker.isNumber(singleResult.name)) {
        return singleResult.name;
      }

      if (singleResult.name.length >= this.config.name.maxLen) {
        return StringTypeProcessor.reduceStringToCharactersCount(singleResult.name, this.config.name.maxLen);
      }

      return singleResult.name;
    },
    /**
     * @description returns the single search result unified identifiers:
     *              - string: if it's too long then reduced value is returned,
     *              - number: returns the value without any changes
     *
     *              Format of output depends on both data type and amount of identifiers in array.
     */
    getIdentifier(singleResult: Record, moduleId: string): string | number {

      let usedIdentifiers = [];
      switch (moduleId) {
        case StorageTypeEnum[StorageTypeEnum.files]:
        case StorageTypeEnum[StorageTypeEnum.images]:
        case StorageTypeEnum[StorageTypeEnum.videos]:
          usedIdentifiers = [singleResult.identifiers[1]];
          break;
        case "notes":
          usedIdentifiers = [singleResult.identifiers[0]];
          break;
        default:
          usedIdentifiers = singleResult.identifiers;
      }

      if (usedIdentifiers.length === 0) {
        throw new BaseError(`No identifiers were delivered for one of results for module: ${moduleId} and query: ${this.query}`);
      }

      if (usedIdentifiers.length === 1) {
        let firstId = usedIdentifiers[0];
        if (TypeChecker.isNumber(firstId)) {
          return firstId
        }

        return this.handleStringIdentifier(firstId, this.config.identifier.maxLen);
      }

      let maxIdLen = this.config.name.maxLen / usedIdentifiers.length;
      let identifiers = [];
      for (let idx in usedIdentifiers) {
        let identifier = usedIdentifiers[idx];

        if (TypeChecker.isNumber(singleResult.identifier)) {
          identifiers.push(identifier);
          continue;
        }

        identifiers.push(this.handleStringIdentifier(identifier, maxIdLen));
      }

      return JSON.stringify(identifiers);
    },
    /**
     * @description process the string based identifier, either return it's full length or reduced one
     */
    handleStringIdentifier(id: string, maxLen: number): string {
      if (id.length >= maxLen) {
        return StringTypeProcessor.reduceStringToCharactersCount(id, maxLen);
      }

      return id;
    },
    /**
     * @description returns the icon name for given module id
     */
    moduleIconName(id: string): string {
      let icon = this.moduleIcon[id] ?? null;
      if (null === icon) {
        throw new BaseError(`Unsupported module: ${id} - got no icon for it`);
      }

      return icon;
    },
    /**
     * @description returns the name for given module id
     */
    moduleName(id: string): string {
      let translation = this.moduleTranslation[id] ?? null;
      if (null === translation) {
        throw new BaseError(`Unsupported module: ${id} - got no translation for it`);
      }

      return translation;
    },
    /**
     * @description builds module url for search result
     */
    onResultClick(searchResult: Record, moduleId: string): string {
      let url = '';
      switch (moduleId) {
        case StorageTypeEnum[StorageTypeEnum.files]:
          url = this.buildStorageUrl(searchResult.identifiers[1], VueRouterStorage.ROUTE_PATH_STORAGE_FILES_FOLDER);
          break;
        case StorageTypeEnum[StorageTypeEnum.images]:
          url = this.buildStorageUrl(searchResult.identifiers[1], VueRouterStorage.ROUTE_PATH_STORAGE_IMAGES_FOLDER);
          break;
        case StorageTypeEnum[StorageTypeEnum.videos]:
          url = this.buildStorageUrl(searchResult.identifiers[1], VueRouterStorage.ROUTE_PATH_STORAGE_VIDEO_FOLDER);
          break;
        case "notes":
          url = this.buildNotesCategoryUrl(searchResult.identifiers[0]);
          break;
        default:
          throw new BaseError(`This module is not supported - cannot build url. Module: ${moduleId}`);
      }


      console.log({
        'going to': url
      })
      this.$router.push(url);
      WindowService.scrollToTop();
    },
    async fetchData(): Promise<void> {
      this.searchResults = await this.$moduleCall.getAll(SymfonySystemRoutes.SEARCH_BASE, null, null, {
        query: this.$route.query.query
      });
    }
  },
  created(): void {
    this.fetchData();
  },
  watch: {
    /**
     * @description this is necessary because there is no page reload, so when user changes query the results must be re-fetched
     */
    '$route.query.query'(): void {
      this.fetchData();
    }
  }
}
</script>

<style lang="scss" scoped>
.single-result {
  @apply w-full lg:w-1/4 transform hover:scale-105 ease-in-out transition-transform cursor-pointer
}
</style>
