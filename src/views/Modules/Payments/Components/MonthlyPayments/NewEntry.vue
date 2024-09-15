<template>
  <Container>
    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('payments.monthly.newForm.header') }}</h2>

        <FormInput type="date"
                   v-model="form.date"
                   :label="$t('payments.monthly.newForm.date.label')"
        />

        <FormInput type="number"
                   v-model="form.money"
                   :label="$t('payments.monthly.newForm.money.label')"
        />

        <FormInput type="text"
                   v-model="form.description"
                   :label="$t('payments.monthly.newForm.description.label')"
        />

        <TypeSelect :types="types" />

        <MediumButtonWithIcon :text="$t('payments.monthly.newForm.submit.label')"
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
import TypeSelect           from "@/views/Modules/Payments/Components/MonthlyPayments/TypeSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        money: null,
        description: null,
        type: null,
      },
    }
  },
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  components: {
    MediumButtonWithIcon,
    Container,
    FormInput,
    TypeSelect,
  },
  emits: [
    "dateChange",
    "moneyChange",
    "descriptionChange",
    "typeChange",
  ],
  watch: {
    'form.date'(): void {
      this.$emit('dateChange', this.form.date);
    },
    'form.money'(): void {
      this.$emit('moneyChange', this.form.money);
    },
    'form.description'(): void {
      this.$emit('descriptionChange', this.form.description);
    },
    'form.type'(): void {
      this.$emit('typeChange', this.form.type);
    },
  }
}
</script>