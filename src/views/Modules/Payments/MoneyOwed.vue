<template>
  <Base :info-block-description="$t('payments.moneyOwed.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />
  </Base>

  <Container>
    <div class="flex justify-center mt-10">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('payments.moneyOwed.newForm.header') }}</h2>
        <FormInput type="text"
                   v-model="form.target"
                   :label="$t('payments.moneyOwed.newForm.target.label')"
        />

        <FormInput type="text"
                   v-model="form.information"
                   :label="$t('payments.moneyOwed.newForm.information.label')"
        />

        <FormInput type="date"
                   v-model="form.date"
                   :label="$t('payments.moneyOwed.newForm.date.label')"
        />

        <FormInput type="number"
                   v-model="form.amount"
                   :label="$t('payments.moneyOwed.newForm.amount.label')"
        />

        <CurrencySelect v-model="form.currency" />

        <div class="mt-4 mb-4 flex flex-row hover:opacity-70 cursor-pointer">
          <Checkbox class="transform scale-75"
                    v-model="form.owedByMe"
                    ref="checkbox"
          />
          <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
                 @click="this.$refs.checkbox.toggle()"
          >
            {{ $t('payments.moneyOwed.newForm.owedByMe.label') }}
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

import Base           from "@/views/Modules/Base.vue";
import Tabs           from "@/components/Navigation/Tabs/Tabs.vue";
import Tab            from "@/views/Modules/Payments/Components/MoneyOwed/TabTable.vue";
import TabSummary     from "@/views/Modules/Payments/Components/MoneyOwed/TabSummary.vue";
import Container      from "@/components/Ui/Containers/Container.vue";
import CurrencySelect from "@/views/Modules/Payments/Components/CurrencySelect.vue";

import Checkbox             from "@/components/Form/Checkbox.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        target: null,
        information: null,
        date: null,
        amount: null,
        currency: null,
        owedByMe: false,
      },
      tableData: [
        {
          values: {
            owedByMe: {
              value: false,
              isComponent: false,
            },
            target: {
              value: "Person 1",
              isComponent: false,
            },
            amount: {
              value: 123.54,
              isComponent: false,
            },
            information: {
              value: "For coffee",
              isComponent: false,
            },
            date: {
              value: "2024-02-05",
              isComponent: false,
            },
            currency: {
              value: "PLN",
              isComponent: false,
            },
          }
        },
        {
          values: {
            owedByMe: {
              value: false,
              isComponent: false,
            },
            target: {
              value: "Person 1",
              isComponent: false,
            },
            amount: {
              value: 333,
              isComponent: false,
            },
            information: {
              value: "For tee",
              isComponent: false,
            },
            date: {
              value: "1991-08-05",
              isComponent: false,
            },
            currency: {
              value: "PLN",
              isComponent: false,
            },
          }
        },
        {
          values: {
            target: {
              value: "Person 2",
              isComponent: false,
            },
            amount: {
              value: 65,
              isComponent: false,
            },
            information: {
              value: "Candies",
              isComponent: false,
            },
            date: {
              value: "2023-01-01",
              isComponent: false,
            },
            owedByMe: {
              value: true,
              isComponent: false,
            },
            currency: {
              value: "EUR",
              isComponent: false,
            },
          }
        }
      ],
    }
  },
  components: {
    MediumButtonWithIcon,
    CurrencySelect,
    FormInput,
    Checkbox,
    Container,
    Tabs,
    Base
  },
  computed: {
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('payments.moneyOwed.tabs.byOthers.label'),
          tabComponent: Tab,
          tabComponentProps: {
            data: this.tableData.filter(dataChunk => !dataChunk.values.owedByMe.value)
          }
        },
        {
          tabName: this.$t('payments.moneyOwed.tabs.byMe.label'),
          tabComponent: Tab,
          tabComponentProps: {
            data: this.tableData.filter(dataChunk => dataChunk.values.owedByMe.value)
          }
        },
        {
          tabName: this.$t('payments.moneyOwed.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {
            data: this.tableData
          }
        },
      ];
    }
  },
  methods: {
    /**
     * @description handles user clicking submit new-form
     */
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>