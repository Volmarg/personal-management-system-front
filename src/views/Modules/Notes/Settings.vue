<template>
  <Base :info-block-description="$t('notes.settings.description')">
    <SimpleTable :headers="table.headers"
                 :data="table.data"
    />

    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('notes.settings.form.header') }}</h2>

        <FormInput type="text"
                   :model-value="form.name"
                   :label="$t('notes.settings.form.name.label')"
        />

        <CategorySelect :label="$t('notes.settings.form.parent.label')" />

        <MediumButtonWithIcon :text="$t('notes.settings.form.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onNewSubmit"
        />

      </div>
    </div>
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SimpleTable              from "@/components/Ui/Table/SimpleTable.vue";
import FormInput                from "@/components/Form/Input.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Base                     from "@/views/Modules/Base.vue";
import CategorySelect           from "@/views/Modules/Notes/Components/CategorySelect.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
      },
      /**
       * @description dummy data for now
       */
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: this.$t('notes.settings.table.header.category.label'),
            dataValuePath : 'category.value',
            dataIsComponentPath : 'category.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('notes.settings.table.header.parent.label'),
            dataValuePath : 'parent.value',
            dataIsComponentPath : 'parent.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('notes.settings.table.header.actions.label'),
            dataValuePath : null,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
        ],
        /**
         * @description dummy data for now
         */
        data: [
          {
            values : {
              category : {
                value       : "candies",
                isComponent : false,
              },
              parent : {
                value       : "sweets",
                isComponent : false,
              }
            }
          },
          {
            values : {
              category : {
                value       : "cookiez",
                isComponent : false,
              },
              parent : {
                value       : "sweets",
                isComponent : false,
              }
            }
          }
        ]
      }
    }
  },
  components: {
    CategorySelect,
    MediumButtonWithIcon,
    SimpleTable,
    FormInput,
    Base,
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