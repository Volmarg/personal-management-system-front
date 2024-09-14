<template>
  <CalendarsTable :data="tableData" />

  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-2">{{ $t('calendar.settings.newEntry.header') }}</h2>

      <FormInput type="text"
                 :model-value="form.name"
                 :label="$t('calendar.settings.newEntry.form.name.label')"
      />

      <FormInput type="color"
                 :model-value="form.color"
                 :label="$t('calendar.settings.newEntry.form.color.label')"
      />

      <MediumButtonWithIcon :text="$t('calendar.settings.newEntry.form.submit.label')"
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

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import CalendarsTable       from "@/views/Modules/Calendar/Settings/Components/CalendarsTable.vue";
import FormInput            from "@/components/Form/Input.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: null,
        color: null,
      },
      tableData: [
        {
          values : {
            name : {
              value       : "work",
              isComponent : false,
            },
            color : {
              value       : "red",
              isComponent : false,
            },
          }
        },
        {
          values : {
            name : {
              value       : "doctor",
              isComponent : false,
            },
            color : {
              value       : "green",
              isComponent : false,
            },
          }
        },
      ],
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon,
    CalendarsTable
  },
  methods: {
    onNewSubmit(): void {
      // todo
    }
  }
}
</script>