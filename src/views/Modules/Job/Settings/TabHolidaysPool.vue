<template>
  <PoolsTable :table-data="tableData" />

  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ $t('job.settings.tabs.managePool.header') }}</h2>

      <FormInput type="number"
                 :model-value="form.years"
                 :label="$t('job.settings.tabs.managePool.form.year.label')"
      />

      <FormInput type="text"
                 :model-value="form.days"
                 :label="$t('job.settings.tabs.managePool.form.daysInPool.label')"
      />

      <FormInput type="number"
                 :model-value="form.companyName"
                 :label="$t('job.settings.tabs.managePool.form.companyName.label')"
      />

      <MediumButtonWithIcon :text="$t('job.settings.tabs.managePool.form.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onNewSubmit"
      />

    </div>
  </div>
</template>

<script lang="ts">
import PoolsTable           from "@/views/Modules/Job/Settings/ManageHolidaysPool/PoolsTable.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        years: '',
        days: '',
        companyName: '',
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    FormInput,
    PoolsTable
  },
  methods: {
    /**
     * @description handle submitting 'add new' form, creates entry in db and updates front
     */
    onNewSubmit(): void {
      //
    }
  }
}
</script>
