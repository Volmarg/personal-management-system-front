<template>
  <Base :info-block-description="$t('payments.productPrices.description')">
    <ProductsTable :data="usedTableData"/>
  </Base>

  <Container>
    <AddEditForm @submit="refreshPageState"
                 :header="$t('payments.productPrices.table.header.header.new')"
    />
  </Container>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AddEditForm   from "@/views/Modules/Payments/Components/Products/AddEditForm.vue";
import ProductsTable from "@/views/Modules/Payments/Components/Products/ProductsTable.vue";
import Container     from "@/components/Ui/Containers/Container.vue";
import Base          from "@/views/Modules/Base.vue";
import TableActions  from "@/components/Ui/Actions/TableActions.vue";

import {StoreDefinition} from "pinia";

import {PaymentProductsState} from "@/scripts/Vue/Store/PaymentProductsState";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

export default {
  data(): ComponentData {
    return {
      products: [],
      stateStore: null as [StoreDefinition | null],
    }
  },
  components: {
    AddEditForm,
    Container,
    Base,
    ProductsTable
  },
  computed: {
    /**
     * @description returns the rows data for table
     */
    usedTableData(): Array {
      let data = [];
      for (let product of this.products) {
        data.push({
          values : {
            id : {
              value       : product.id,
              isComponent : false,
            },
            name : {
              value       : product.name,
              isComponent : false,
            },
            market : {
              value       : product.market,
              isComponent : false,
            },
            products : {
              value       : product.products,
              isComponent : false,
            },
            information : {
              value       : product.information,
              isComponent : false,
            },
            rejected : {
              value       : this.$t(`generic.bool.yesNo.${Number(product.rejected)}`),
              rawValue    : product.rejected,
              isComponent : false,
            },
            price : {
              value       : product.price,
              isComponent : false,
            },
            homeCurrencyPrice : {
              value       : product.homeCurrencyPrice,
              isComponent : false,
            },
            actions: {
              value: TableActions,
              isComponent: true,
              componentProps : {
                editActionForm: AddEditForm,
                baseUrl: SymfonyPaymentsRoutes.PRODUCT_PRICES_BASE_URL,
                store: PaymentProductsState,
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
     * @description fetches latest data set from db and updates front
     */
    async refreshPageState(): Promise<void> {
      await this.stateStore.getAll();
      this.products = this.stateStore.allEntries;
    }
  },
  beforeMount(): void {
    this.stateStore = PaymentProductsState();
    this.refreshPageState();
  },
  watch: {
    'stateStore.allEntries': {
      deep: true,
      handler: function() {
        this.products = this.stateStore.allEntries;
      }
    }
  }
}
</script>