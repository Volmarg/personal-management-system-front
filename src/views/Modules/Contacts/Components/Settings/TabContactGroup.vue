<template>
  <SimpleTable :headers="table.headers"
               :data="table.data"
  />

  <div class="flex justify-center">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('contacts.settings.tabs.contactType.form.header') }}</h2>
      <FormInput type="text"
                 :model-value="form.name"
                 :label="$t('contacts.settings.tabs.contactType.form.name.label')"
      />

      <MediumButtonWithIcon :text="$t('contacts.settings.tabs.contactType.form.submitButton.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onNewSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: ''
      },
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: 'Name',
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: 'Actions',
            dataValuePath : 'actions.value',
            dataIsComponentPath : 'actions.isComponent',
            dataComponentPropertiesPath: null
          },
        ],
        /**
         * @description dummy data for now
         */
        data: [
          {
            values : {
              name : {
                value       : "name",
                isComponent : false,
              },
              actions : {
                value       : "actions",
                isComponent : false,
              },
            }
          },
          {
            values : {
              name : {
                value       : "name2",
                isComponent : false,
              },
              actions : {
                value       : "actions2",
                isComponent : false,
              },
            }
          }
        ]
      }
    }
  },
  components: {
    MediumButtonWithIcon,
    SimpleTable,
    FormInput,
  },
  methods: {
    /**
     * @description triggered when user submits the form, updates front and back
     */
    onNewSubmit(): void {
      //
    },
  }
}
</script>