<template>
  <Base :info-block-description="$t('notes.settings.description')">
    <SimpleTable :headers="table.headers"
                 :data="usedTableData"
    />

    <AddEditForm @submit="onNewSubmit"
                 :header="$t('notes.settings.form.header.new')"
    />

  </Base>
</template>

<script lang="ts">
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";

import AddEditForm              from "@/views/Modules/Notes/Components/Settings/AddEditForm.vue";
import SimpleTable              from "@/components/Ui/Table/SimpleTable.vue";
import Base                     from "@/views/Modules/Base.vue";
import TableActions             from "@/components/Ui/Actions/TableActions.vue";

import SymfonyNotesRoutes from "@/router/SymfonyRoutes/Modules/SymfonyNotesRoutes";

import {CategoriesState} from "@/scripts/Vue/Store/Module/Notes/CategoriesState";

export default {
  data(): ComponentData {
    return {
      categoriesStore: null as null | StoreDefinition,
      categories: [],
      /**
       * @description dummy data for now
       */
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: 'id',
            dataValuePath : 'id.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: 'parentId',
            dataValuePath : 'parentId.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('notes.settings.table.header.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('notes.settings.table.header.parent.label'),
            dataValuePath : 'parent.value',
            dataIsComponentPath : 'parent.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('notes.settings.table.header.actions.label'),
            dataValuePath : "actions.value",
            dataIsComponentPath : "actions.isComponent",
            dataComponentPropertiesPath: "actions.componentProps"
          },
        ],
      }
    }
  },
  components: {
    AddEditForm,
    SimpleTable,
    Base,
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let category of this.categories) {
        data.push({
          values: {
            id : {
              value       : category.id,
              isComponent : false,
            },
            parentId : {
              value       : category.parentId,
              isComponent : false,
            },
            name : {
              value       : category.name,
              isComponent : false,
            },
            parent : {
              value       : category.parentName + (category.isParentDeleted ? ` (${this.$t('notes.settings.text.isDeleted')})` : ''),
              isComponent : false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyNotesRoutes.NOTES_CATEGORIES_BASE_URL,
                store: CategoriesState,
              }
            }
          }
        })
      }

      return data;
    },
  },
  methods: {
    /**
     * @description refreshes categories state in the store
     */
    async refreshPage(): Promise<void> {
      await this.categoriesStore.getAll();
      this.categories = this.categoriesStore.allEntries;
    },
    /**
     * @description will refresh the page state when form is submitted
     */
    onNewSubmit(): void {
      this.refreshPage();
    },
  },
  beforeMount(): void {
    this.categoriesStore = CategoriesState();
  },
  watch: {
    'categoriesStore.allEntries': {
      deep: true,
      handler: function () {
        this.categories = this.categoriesStore.allEntries;
      }
    }
  }
}
</script>