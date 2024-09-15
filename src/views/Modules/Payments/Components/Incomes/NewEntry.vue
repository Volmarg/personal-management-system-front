<template>
  <Container>
    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('payments.incomes.newForm.header') }}</h2>

        <FormInput type="date"
                   v-model="form.date"
                   :label="$t('payments.incomes.newForm.date.label')"
        />

        <FormInput type="number"
                   v-model="form.amount"
                   :label="$t('payments.incomes.newForm.amount.label')"
        />

        <FormInput type="text"
                   v-model="form.information"
                   :label="$t('payments.incomes.newForm.information.label')"
        />

        <CurrencySelect v-model="form.currency" />

        <MediumButtonWithIcon :text="$t('payments.incomes.newForm.submit.label')"
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
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Container            from "@/components/Ui/Containers/Container.vue";
import FormInput            from "@/components/Form/Input.vue";
import CurrencySelect       from "@/views/Modules/Payments/Components/CurrencySelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        amount: null,
        information: null,
        currency: null,
      },
    }
  },
  components: {
    MediumButtonWithIcon,
    Container,
    FormInput,
    CurrencySelect,
  },
  emits: [
    "dateChange",
    "amountChange",
    "informationChange",
    "currencyChange",
  ],
  watch: {
    'form.date'(): void {
      this.$emit('dateChange', this.form.date);
    },
    'form.amount'(): void {
      this.$emit('amountChange', this.form.money);
    },
    'form.information'(): void {
      this.$emit('informationChange', this.form.description);
    },
    'form.currency'(): void {
      this.$emit('typeChange', this.form.type);
    },
  }
}
</script>