<template>
  <div v-if="data.length > 0">
    <div class="flex flex-col justify-end">
      <div>
        <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('payments.productPrices.table.filter.header') }}</h2>
      </div>

      <div class="flex flex-col md:flex-row justify-end">
        <MediumButtonWithIcon :text="$t('payments.productPrices.table.filter.rejection.all')"
                              @button-click="applyRejectionFilter(null)"
                              button-classes="w-full md:w-auto flex justify-center md:block"
                              text-classes="text-center"
                              class="w-full md:w-auto mb-1 md:mb-0"
        />
        <MediumButtonWithIcon :text="$t('payments.productPrices.table.filter.rejection.rejectedOnly')"
                              @button-click="applyRejectionFilter(true)"
                              button-classes="w-full md:w-auto flex justify-center md:block"
                              text-classes="text-center"
                              class="w-full md:w-auto mb-1 md:mb-0"
        />
        <MediumButtonWithIcon :text="$t('payments.productPrices.table.filter.rejection.acceptedOnly')"
                              @button-click="applyRejectionFilter(false)"
                              button-classes="w-full md:w-auto flex justify-center md:block"
                              text-classes="text-center"
                              class="w-full md:w-auto mb-1 md:mb-0"
        />
      </div>
    </div>

    <SimpleTable :headers="headers"
                 :data="usedData"
                 ref="table"
                 class="mt-4"
    />
  </div>

  <NoResultsText v-else />
</template>

<script lang="ts">
import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import NoResultsText        from "@/components/Page/NoResultsText.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      rejectionFilter: null,
      headers: [
        {
          label: 'id',
          dataValuePath : 'id.value',
          isVisible: false,
          dataIsComponentPath : null,
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.name.label'),
          dataValuePath : 'name.value',
          dataIsComponentPath : 'name.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.market.label'),
          dataValuePath : 'market.value',
          dataIsComponentPath : 'market.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.products.label'),
          dataValuePath : 'products.value',
          dataIsComponentPath : 'products.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.information.label'),
          dataValuePath : 'information.value',
          dataIsComponentPath : 'information.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.rejected.label'),
          dataValuePath : 'rejected.value',
          dataRawValuePath : 'rejected.rawValue',
          dataIsComponentPath : 'rejected.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.price.label'),
          dataValuePath : 'price.value',
          dataIsComponentPath : 'price.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.homeCurrency.label'),
          dataValuePath : 'homeCurrencyPrice.value',
          dataIsComponentPath : 'homeCurrencyPrice.isComponent',
          dataComponentPropertiesPath: null
        },
        {
          label: this.$t('payments.productPrices.table.header.actions.label'),
          dataValuePath : 'actions.value',
          dataIsComponentPath : 'actions.isComponent',
          dataComponentPropertiesPath: 'actions.componentProps'
        },
      ],
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    NoResultsText,
    SimpleTable
  },
  computed: {
    /**
     * @description returns the data that will be used in table
     */
    usedData(): Array {
      let usedData = [];
      for (let dataChunk of this.data) {
        if ((this.rejectionFilter === true || this.rejectionFilter === false) && dataChunk.values.rejected.rawValue !== this.rejectionFilter) {
          continue;
        }

        usedData.push(dataChunk);
      }

      return usedData;
    },
  },
  methods: {
    /**
     * @description react to user clicking on year filter, will non-directly filter table data
     */
    applyRejectionFilter(isRejected: boolean | null): void {
      this.rejectionFilter = isRejected;
      this.$refs.table.refresh();
    },
  }
}
</script>
