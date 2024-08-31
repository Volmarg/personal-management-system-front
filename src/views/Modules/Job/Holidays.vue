<template>
  <Base :info-block-description="$t('reports.historical.paymentsSummaries.description')"
        :is-in-container="false"
  >
    <Container>
      <Tabs :tabs-with-content="tabsContent" />
    </Container>

    <Container class="mt-4">
      <div class="flex justify-center">
        <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
          <h2 class="text-lg mb-2">{{ $t('afterhours.new.form.header') }}</h2>

          <YearSelect :options="years"
                      v-model="form.year"
                      class="mb-6"
          />

          <FormInput type="text"
                     :model-value="form.daysSpent"
                     :label="$t('holidays.shared.form.information.label')"
          />

          <FormInput type="number"
                     :model-value="form.information"
                     :label="$t('afterhours.new.form.minutes.label')"
          />

          <MediumButtonWithIcon :text="$t('holidays.shared.form.submit.label')"
                                button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                                class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                                button-classes="w-full md:w-auto m-0-force"
                                text-classes="text-center w-full"
                                @button-click="onNewSubmit"
          />

        </div>
      </div>
    </Container>

  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Container from "@/components/Ui/Containers/Container.vue";
import Tabs      from "@/components/Navigation/Tabs/Tabs.vue";
import Base      from "@/views/Modules/Base.vue";

import TabSpent   from "@/views/Modules/Job/Holidays/TabSpent.vue";
import TabSummary from "@/views/Modules/Job/Holidays/TabSummary.vue";

import YearSelect           from "@/views/Modules/Job/Holidays/YearSelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      years: [
        {
          label: 2019,
          value: 2019,
        },
        {
          label: 2023,
          value: 2023,
        },
      ],
      form: {
        daysSpent: '',
        information: '',
        year: ''
      }
    }
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
    YearSelect,
    Container,
    Base,
    Tabs,
  },
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('holidays.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('holidays.tabs.spent.label'),
          tabComponent: TabSpent,
          tabComponentProps: {}
        }
      ];
    }
  },
  methods: {
    /**
     * @description handle user pressing submit, creates entry in db and updates front
     */
    onNewSubmit(): void {
      //
    }
  }
}
</script>