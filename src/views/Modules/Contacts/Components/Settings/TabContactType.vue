<template>
  <SimpleTable :headers="table.headers"
               :data="tableData"
  />

  <AddEditForm :header="$t('contacts.settings.tabs.contactType.form.header')"
               @submit="store.getAll"
  />

</template>

<script lang="ts">
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {TypeStore}       from "@/scripts/Vue/Store/Module/Contacts/TypeStore";

import SymfonyContactsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

import AddEditForm  from "@/views/Modules/Contacts/Components/Settings/Type/AddEditForm.vue";
import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";
import Image        from "@/components/Ui/Image.vue";

export default {
  data(): ComponentData {
    return {
      allTypes: [],
      store: null as null | StoreDefinition,
      form: {
        name: '',
        imagePath: ''
      },
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
            label: 'imagePath',
            dataValuePath : 'imagePath.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('contacts.settings.tabs.contactType.table.headers.name'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('contacts.settings.tabs.contactType.table.headers.preview'),
            dataValuePath : 'preview.value',
            dataIsComponentPath : 'preview.isComponent',
            dataComponentPropertiesPath: 'preview.componentProps'
          },
          {
            label: this.$t('contacts.settings.tabs.contactType.table.headers.actions'),
            dataValuePath : 'actions.value',
            dataIsComponentPath : 'actions.isComponent',
            dataComponentPropertiesPath: 'actions.componentProps'
          },
        ],
        /**
         * @description dummy data for now
         */
      }
    }
  },
  components: {
    SimpleTable,
    AddEditForm,
  },
  computed: {
    /**
     * @description returns table data
     */
    tableData(): Array {
      let data = [];
      for (let type of this.allTypes) {
        data.push({
          values: {
            id: {
              value: type.id,
              isComponent: false,
            },
            name: {
              value: type.name,
              isComponent: false,
            },
            preview: {
              value: Image,
              isComponent: true,
              componentProps : {
                path: type.imagePath,
                width: '50px'
              }
            },
            imagePath: {
              value: type.imagePath,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyContactsRoutes.TYPES_BASE_URL,
                store: TypeStore,
              }
            }
          }
        })
      }

      return data;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = TypeStore();
    await this.store.getAll();
    this.allTypes = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.allTypes = this.store.allEntries;
      }
    }
  }
}
</script>