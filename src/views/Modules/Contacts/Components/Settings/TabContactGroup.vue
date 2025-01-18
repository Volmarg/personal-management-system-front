<template>
  <SimpleTable :headers="table.headers"
               :data="tableData"
  />
  <AddEditForm :header="$t('contacts.settings.tabs.contactGroup.form.header')"
               @submit="store.getAll"
  />
</template>

<script lang="ts">
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {GroupStore}      from "@/scripts/Vue/Store/Module/Contacts/GroupStore";

import AddEditForm  from "@/views/Modules/Contacts/Components/Settings/Group/AddEditForm.vue";
import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";

import SymfonyContactsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyContactsRoutes";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      groups: [],
      table: {
        headers: [
          {
            label: 'id',
            dataValuePath : 'id.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('contacts.settings.tabs.contactGroup.table.headers.name'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('contacts.settings.tabs.contactGroup.table.headers.actions'),
            dataValuePath : 'actions.value',
            dataIsComponentPath : 'actions.isComponent',
            dataComponentPropertiesPath: 'actions.componentProps'
          },
        ],
      }
    }
  },
  components: {
    AddEditForm,
    SimpleTable,
  },
  computed: {
    /**
     * @description returns table data
     */
    tableData(): Array {
      let data = [];
      for (let group of this.groups) {
        data.push({
          values: {
            id: {
              value: group.id,
              isComponent: false,
            },
            name: {
              value: group.name,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyContactsRoutes.GROUPS_BASE_URL,
                store: GroupStore,
              }
            }
          }
        })
      }

      return data;
    },
  },
  async beforeMount(): Promise<void> {
    this.store = new GroupStore();
    await this.store.getAll();
    this.groups = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.groups = this.store.allEntries;
      }
    }
  }
}
</script>