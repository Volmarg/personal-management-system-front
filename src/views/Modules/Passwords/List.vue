<template>
  <Base :info-block-description="$t('passwords.list.description')">
    <SimpleTable :headers="table.headers"
                 :data="tableData"
    />

    <AddEditForm :header="$t('passwords.list.form.header')"
                 @submit="store.getAll"
    />
  </Base>
</template>

<script lang="ts">
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {PasswordsStore}  from "@/scripts/Vue/Store/Module/Passwords/PasswordsStore";

import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import Base         from "@/views/Modules/Base.vue";
import TableActions from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm  from "@/views/Modules/Passwords/List/AddEditForm.vue";

import SymfonyPasswordsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPasswordsRoutes";
import StringTypeProcessor    from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      passwords: [],
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
            label: 'groupId',
            dataValuePath : 'groupId.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.password.label'),
            dataValuePath : 'password.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.login.label'),
            dataValuePath : 'login.value',
            dataIsComponentPath : 'login.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.url.label'),
            dataValuePath : 'url.value',
            dataIsComponentPath : 'url.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.description.label'),
            dataValuePath : 'description.value',
            dataIsComponentPath : 'description.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.group.label'),
            dataValuePath : 'groupName.value',
            dataIsComponentPath : 'groupName.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('passwords.list.table.headers.actions.label'),
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
    tableData(): Array {
      let data = [];
      for (let password of this.passwords) {
        data.push({
          values: {
            id: {
              value: password.id,
              isComponent: false,
            },
            password: {
              value: password.password,
              isComponent: false,
            },
            login: {
              value: password.login,
              isComponent: false,
            },
            url: {
              value: password.url,
              isComponent: false,
            },
            description: {
              value: password.description,
              isComponent: false,
            },
            groupId: {
              value: password.groupId,
              isComponent: false,
            },
            groupName: {
              value: StringTypeProcessor.ucFirst(password.groupName),
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                canCopyToClipboard: true,
                copiedDataKey: 'password',
                editActionForm: AddEditForm,
                baseUrl: SymfonyPasswordsRoutes.PASSWORDS_BASE_URL,
                store: PasswordsStore,
              }
            }
          }
        });
      }
      return data;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = PasswordsStore();
    await this.store.getAll();
    this.passwords = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.passwords = this.store.allEntries;
      }
    }
  }
}
</script>