<template>
  <Base :info-block-description="$t('goals.payments.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />

    <Container class="mt-4">
      <div class="flex justify-center">
        <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
          <h2 class="text-lg mb-2">{{ $t('goals.payments.form.header') }}</h2>
          <FormInput type="text"
                     v-model="form.name"
                     :label="$t('goals.payments.form.name.label')"
          />

          <FormInput type="date"
                     v-model="form.start"
                     :label="$t('goals.payments.form.start.label')"
          />

          <FormInput type="date"
                     v-model="form.end"
                     :label="$t('goals.payments.form.end.label')"
          />

          <FormInput type="number"
                     v-model="form.goal"
                     :label="$t('goals.payments.form.goal.label')"
          />

          <FormInput type="number"
                     v-model="form.collect"
                     :label="$t('goals.payments.form.collected.label')"
          />

          <div class="mb-4 flex flex-row hover:opacity-70 cursor-pointer">
            <Checkbox class="transform scale-75"
                      v-model="form.showOnDashboard"
                      ref="showOnDashboard"
                      @click="$refs.showOnDashboard.toggle()"
            />
            <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
                   @click="$refs.showOnDashboard.toggle()"
            >{{ $t('goals.payments.form.showOnDashboard.label') }}</label>
          </div>

          <MediumButtonWithIcon :text="$t('job.holidays.shared.form.submit.label')"
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

import TabList   from "@/views/Modules/Goals/Payments/TabList.vue";
import TabManage from "@/views/Modules/Goals/Payments/TabManage.vue";

import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Checkbox             from "@/components/Form/Checkbox.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        start: '',
        end: '',
        goal: '',
        collect: '',
        showOnDashboard: '',
      }
    }
  },
  components: {
    Checkbox,
    MediumButtonWithIcon,
    FormInput,
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
          tabName: this.$t('goals.payments.tab.list.header'),
          tabComponent: TabList,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('goals.payments.tab.manage.header'),
          tabComponent: TabManage,
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