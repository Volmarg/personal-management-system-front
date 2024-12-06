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

        <TypeSelect v-model="form.typeId" />

        <MediumButtonWithIcon :text="$t('payments.monthly.newForm.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onSubmit"
        />

      </div>
    </div>
  </Container>
</template>
<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Container            from "@/components/Ui/Containers/Container.vue";
import FormInput            from "@/components/Form/Input.vue";
import TypeSelect           from "@/views/Modules/Payments/Components/Common/PaymentTypeSelect.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import BackendModuleCallConfig from "@/scripts/Dto/BackendModuleCallConfig";
import SymfonyPaymentsRoutes   from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";
import BaseApiResponse         from "@/scripts/Response/BaseApiResponse";

export default {
  data(): ComponentData {
    return {
      form: {
        date: null,
        money: null,
        description: null,
        typeId: null,
      },
    }
  },
  props: {
    id: {
      type: [Number, null],
      required: false,
      default: null,
    },
    date: {
      type: [String, null],
      required: false,
      default: null,
    },
    money: {
      type: [Number, null],
      required: false,
      default: null,
    },
    description: {
      type: [String, null],
      required: false,
      default: null,
    },
    typeId: {
      type: [Number, null],
      required: false,
      default: null,
    }
  },
  components: {
    MediumButtonWithIcon,
    Container,
    FormInput,
    TypeSelect,
  },
  methods: {
    /**
     * @description wipes the form data
     */
    clearForm(): void {
      this.form.typeId = null;
      this.form.date = null;
      this.form.description = null;
      this.form.money = null;
    },
    /**
     * @description handle submitting form data - send data to backend
     */
    async onSubmit(): void {
      let config = new BackendModuleCallConfig(SymfonyPaymentsRoutes.MONTHLY_BASE_URL, this.id, BaseApiResponse, this.form);
      config.reload = false;

      let response: BaseApiResponse;
      if (this.id) {
        response = await this.$moduleCall.update(config);
      } else {
        response = await this.$moduleCall.new(config);
      }

      if (response.success) {
        this.$emit('submit');
        this.clearForm();
      }
    }
  },
  beforeMount(): void {
    this.form.typeId = this.typeId;
    this.form.date = this.date;
    this.form.description = this.description;
    this.form.money = this.money;
  }
}
</script>