<template>
  <div class="mt-10">
    <h2 class="text-lg">{{ $t('systemSettings.tab.finances.currencies.header') }}</h2>
    <SimpleTable :headers="table.headers"
                 :data="table.data"
    />

    <div class="flex justify-center mt-10">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('systemSettings.tab.finances.currencies.form.header') }}</h2>

        <FormInput type="text"
                   v-model="form.target"
                   :label="$t('systemSettings.tab.finances.currencies.form.name.label')"
                   :question-mark-text="$t('systemSettings.tab.finances.currencies.form.name.about')"
        />

        <FormInput type="text"
                   v-model="form.information"
                   :label="$t('systemSettings.tab.finances.currencies.form.symbol.label')"
                   :question-mark-text="$t('systemSettings.tab.finances.currencies.form.symbol.about')"
        />

        <FormInput type="number"
                   v-model="form.date"
                   :label="$t('systemSettings.tab.finances.currencies.form.multiplier.label')"
                   :question-mark-text="$t('systemSettings.tab.finances.currencies.form.multiplier.about')"
        />

        <div class="ml-6 flex flex-row hover:opacity-70 cursor-pointer">
          <Checkbox class="transform scale-75"
                    v-model="form.owedByMe"
                    ref="checkbox"
          />
          <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
                 @click="this.$refs.checkbox.toggle()"
          >
            {{ $t('systemSettings.tab.finances.currencies.form.isDefault.label') }}
          </label>
        </div>

        <MediumButtonWithIcon :text="$t('systemSettings.tab.finances.currencies.form.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="ml-6 w-full mb-1 md:col-start-1 md:col-end-2 mt-6 pr-6 md:pr-0"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onNewSubmit"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import SimpleTable              from "@/components/Ui/Table/SimpleTable.vue";
import FormInput                from "@/components/Form/Input.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Checkbox                 from "@/components/Form/Checkbox.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        login: '',
        password: '',
        url: '',
        description: '',
        group: null,
      },
      /**
       * @description dummy data for now
       */
      groups: [
        {
          label: "Group1",
          value: "g1"
        },
        {
          label: "Group2",
          value: "g2"
        },
      ],
      table: {
        /**
         * @description dummy data for now
         */
        headers: [
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.symbol.label'),
            dataValuePath : 'symbol.value',
            dataIsComponentPath : 'symbol.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.multiplier.label'),
            dataValuePath : 'multiplier.value',
            dataIsComponentPath : 'multiplier.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.isDefault.label'),
            dataValuePath : 'isDefault.value',
            dataIsComponentPath : 'isDefault.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('systemSettings.tab.finances.currencies.table.headers.actions.label'),
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
              name : {
                value       : "EUR",
                isComponent : false,
              },
              symbol : {
                value       : "€",
                isComponent : false,
              },
              multiplier : {
                value       : 4.3,
                isComponent : false,
              },
              isDefault : {
                value       : this.$t(`systemSettings.tab.finances.currencies.form.isDefault.state.${Number(true)}`),
                isComponent : false,
              },
            }
          },
          {
            values : {
              name : {
                value       : "USD",
                isComponent : false,
              },
              symbol : {
                value       : "$",
                isComponent : false,
              },
              multiplier : {
                value       : 4.0,
                isComponent : false,
              },
              isDefault : {
                value       : this.$t(`systemSettings.tab.finances.currencies.form.isDefault.state.${Number(false)}`),
                isComponent : false,
              },
            }
          }
        ]
      }
    }
  },
  components: {
    Checkbox,
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