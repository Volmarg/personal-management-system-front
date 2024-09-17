<template>
  <Base :info-block-description="$t('payments.productPrices.newForm.header')">
    <ProductsTable :data="tableData"/>
  </Base>

  <Container>
    <div class="flex justify-center mt-10">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('payments.bills.management.newForm.header') }}</h2>

        <FormInput type="text"
                   v-model="form.name"
                   :label="$t('payments.productPrices.newForm.name.label')"
        />

        <FormInput type="number"
                   v-model="form.price"
                   :label="$t('payments.productPrices.newForm.price.label')"
        />

        <FormInput type="text"
                   v-model="form.market"
                   :label="$t('payments.productPrices.newForm.market.label')"
        />

        <FormInput type="text"
                   v-model="form.products"
                   :label="$t('payments.productPrices.newForm.products.label')"
        />

        <FormInput type="text"
                   v-model="form.information"
                   :label="$t('payments.productPrices.newForm.information.label')"
        />

        <div class="mb-4 flex flex-row hover:opacity-70 cursor-pointer">
          <Checkbox class="transform scale-75"
                    v-model="form.rejected"
                    ref="checkbox"
          />
          <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
                 @click="this.$refs.checkbox.toggle()"
          >
            {{ $t('payments.productPrices.newForm.rejected.label') }}
          </label>
        </div>

        <MediumButtonWithIcon :text="$t('payments.productPrices.newForm.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onNewSubmit"
        />

      </div>
    </div>
  </Container>

</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import ProductsTable from "@/views/Modules/Payments/Components/Products/ProductsTable.vue";
import Container     from "@/components/Ui/Containers/Container.vue";
import Base          from "@/views/Modules/Base.vue";
import FormInput     from "@/components/Form/Input.vue";
import Checkbox      from "@/components/Form/Checkbox.vue";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        price: null,
        market: null,
        products: null,
        information: null,
        rejected: false,
      },
      tableData: [
        {
          values : {
            name : {
              value       : "Bread",
              isComponent : false,
            },
            market : {
              value       : "Lidl",
              isComponent : false,
            },
            products : {
              value       : "Full grain",
              isComponent : false,
            },
            information : {
              value       : "Super tasty!",
              isComponent : false,
            },
            rejected : {
              value       : true,
              isComponent : false,
            },
            rejectedLabel : {
              value       : "Yes",
              isComponent : false,
            },
            price : {
              value       : 10.25,
              isComponent : false,
            }
          }
        },
        {
          values : {
            name : {
              value       : "Candy",
              isComponent : false,
            },
            market : {
              value       : "Aldi",
              isComponent : false,
            },
            products : {
              value       : "Tiny candy",
              isComponent : false,
            },
            information : {
              value       : "Super-small!",
              isComponent : false,
            },
            rejected : {
              value       : false,
              isComponent : false,
            },
            rejectedLabel : {
              value       : "No",
              isComponent : false,
            },
            price : {
              value       : 0.25,
              isComponent : false,
            }
          }
        }
      ]
    }
  },
  components: {
    MediumButtonWithIcon, FormInput,
    Container,
    Base,
    Checkbox,
    ProductsTable
  },
  methods: {
    /**
     * @description handle clicking on the submit form button
     */
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>