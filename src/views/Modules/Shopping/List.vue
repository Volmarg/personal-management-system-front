<template>
  <Base :info-block-description="$t('shopping.plans.description')"
        :is-in-container="false"
  >
    <Container>
      <SimpleTable :headers="table.headers"
                   :data="table.data"
      />
    </Container>

    <Container class="mt-6">
      <div class="flex justify-center">
        <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
          <h2 class="text-lg">{{ $t('shopping.plans.form.header') }}</h2>
          <FormInput type="text"
                     :model-value="form.name"
                     :label="$t('shopping.plans.form.name.label')"
          />

          <FormInput type="text"
                     :model-value="form.information"
                     :label="$t('shopping.plans.form.information.label')"
          />

          <FormInput type="text"
                     :model-value="form.example"
                     :label="$t('shopping.plans.form.example.label')"
          />

          <MediumButtonWithIcon :text="$t('shopping.plans.form.submit.label')"
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

import SimpleTable          from "@/components/Ui/Table/SimpleTable.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Base                 from "@/views/Modules/Base.vue";
import Container from "@/components/Ui/Containers/Container.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        name: '',
        information: '',
        example: '',
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
            label: this.$t('shopping.plans.table.headers.name.label'),
            dataValuePath : 'name.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.information.label'),
            dataValuePath : 'information.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.example.label'),
            dataValuePath : 'example.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: this.$t('shopping.plans.table.headers.actions.label'),
            dataValuePath : 'group.value',
            dataIsComponentPath : 'name.isComponent',
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
              information : {
                value       : "name",
                isComponent : false,
              },
              example : {
                value       : "name",
                isComponent : false,
              },
            }
          },
          {
            values : {
              name : {
                value       : "name",
                isComponent : false,
              },
              information : {
                value       : "name",
                isComponent : false,
              },
              example : {
                value       : "name",
                isComponent : false,
              },
            }
          },
        ]
      }
    }
  },
  components: {
    Container,
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