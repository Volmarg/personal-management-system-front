<template>
  <Base :info-block-description="$t('shopping.plans.description')">
    <SimpleTable :headers="table.headers"
                 :data="tableData"
    />

  <AddEditForm :header="$t('shopping.plans.form.header')"
               @submit="store.getAll"
  />
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import TableActions from "@/components/Ui/Actions/TableActions.vue";
import AddEditForm  from "@/views/Modules/Shopping/Plans/AddEditForm.vue";
import SimpleTable  from "@/components/Ui/Table/SimpleTable.vue";
import Base         from "@/views/Modules/Base.vue";

import {StoreDefinition}    from "pinia";
import {ShoppingPlansStore} from "@/scripts/Vue/Store/Module/Shoping/Plans/ShoppingPlansStore";

import SymfonyShoppingRoutes from "@/router/SymfonyRoutes/Modules/SymfonyShoppingRoutes";

export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      plans: [],
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
            label: this.$t('shopping.plans.table.headers.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.information.label'),
            dataValuePath : 'information.value',
            dataIsComponentPath : 'information.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.example.label'),
            dataValuePath : 'example.value',
            dataIsComponentPath : 'example.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.actions.label'),
            dataValuePath : 'actions.value',
            dataIsComponentPath : 'actions.isComponent',
            dataComponentPropertiesPath: 'actions.componentProps'
          }
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
      for (let plan of this.plans) {
        data.push({
          values: {
            id: {
              value: plan.id,
              isComponent: false,
            },
            information: {
              value: plan.information,
              isComponent: false,
            },
            example: {
              value: plan.example,
              isComponent: false,
            },
            name: {
              value: plan.name,
              isComponent: false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps: {
                editActionForm: AddEditForm,
                baseUrl: SymfonyShoppingRoutes.PLANS_BASE_URL,
                store: ShoppingPlansStore,
              }
            }
          }
        })
      }

      return data;
    }
  },
  async beforeMount(): Promise<void> {
    this.store = ShoppingPlansStore();
    await this.store.getAll();
    this.plans = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.plans = this.store.allEntries;
      }
    }
  }
}
</script>