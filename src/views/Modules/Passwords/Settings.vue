<template>
  <Base :info-block-description="$t('passwords.settings.groups.description')">
    <SimpleTable :headers="table.headers"
                 :data="tableData"
    />

    <AddEditForm :header="$t('passwords.settings.groups.form.new.header')"
                 @submit="store.getAll"
    />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import Base         from "@/views/Modules/Base.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm  from "@/views/Modules/Passwords/Settings/Group/AddEditForm.vue";

import SymfonyPasswordsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPasswordsRoutes";

import {GroupsStore}     from "@/scripts/Vue/Store/Module/Passwords/GroupsStore";
import {StoreDefinition} from "pinia";

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
            label: this.$t('passwords.settings.groups.table.headers.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.settings.groups.table.headers.actions.label'),
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
    Base,
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
                baseUrl: SymfonyPasswordsRoutes.PASSWORDS_GROUPS_BASE_URL,
                store: GroupsStore,
              }
            }
          }
        })
      }

      return data;
    },
  },
  async beforeMount(): Promise<void> {
    this.store = GroupsStore();
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