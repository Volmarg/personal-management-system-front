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
          <h2 class="text-lg mb-2">{{ $t('job.afterhours.new.form.header') }}</h2>
          <FormInput type="date"
                     :model-value="form.date"
                     :label="$t('job.afterhours.new.form.date.label')"
          />

          <FormInput type="text"
                     :model-value="form.description"
                     :label="$t('job.afterhours.new.form.description.label')"
          />

          <FormInput type="number"
                     :model-value="form.minutes"
                     :label="$t('job.afterhours.new.form.minutes.label')"
          />

          <GoalInput :options="type"
                     v-model="form.goal"
                     class="mb-6"
          />

          <TypeSelect :options="type"
                      v-model="form.type"
                      class="mb-6"
          />

          <MediumButtonWithIcon :text="$t('job.afterhours.new.form.submit.label')"
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
import Base        from "@/views/Modules/Base.vue";
import Container   from "@/components/Ui/Containers/Container.vue";
import Tabs        from "@/components/Navigation/Tabs/Tabs.vue";

import TabMade    from "@/views/Modules/Job/Afterhours/TabMade.vue";
import TabSpent   from "@/views/Modules/Job/Afterhours/TabSpent.vue";
import TabSummary from "@/views/Modules/Job/Afterhours/TabSummary.vue";

import FormInput  from "@/components/Form/Input.vue";
import TypeSelect from "@/views/Modules/Job/Afterhours/TypeSelect.vue";
import GoalInput  from "@/views/Modules/Job/Afterhours/GoalInput.vue";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";


export default {
  data(): ComponentData {
    return {
      form: {
        date: '',
        description: '',
        minutes: '',
        goal: '',
        type: '',
      },
      type: [
        {
          label: "Made",
          value: "made"
        },
        {
          label: "Spent",
          value: "spent"
        }
      ],
      goal: [
        {
          label: "Festival",
          value: "festival"
        },
        {
          label: "Holidays",
          value: "holidays"
        }
      ]
    }
  },
  components: {
    MediumButtonWithIcon,
    TypeSelect,
    FormInput,
    GoalInput,
    Tabs,
    Container,
    Base
  },
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('job.afterhours.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('job.afterhours.tabs.made.label'),
          tabComponent: TabMade,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('job.afterhours.tabs.spent.label'),
          tabComponent: TabSpent,
          tabComponentProps: {}
        }
      ];
    },
  },
  methods: {
    /**
     * @description crate entry on backend and update front
     */
    onNewSubmit(): void {
      //
    }
  }
}
</script>