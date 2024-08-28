<template>
  <Base :info-block-description="$t('passwords.list.description')">
    <SimpleTable :headers="table.headers"
                 :data="table.data"
    />

    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
        <h2 class="text-lg">{{ $t('passwords.list.form.header') }}</h2>
        <FormInput type="text"
                   :model-value="form.login"
                   :label="$t('passwords.list.form.new.login.label')"
        />

        <FormInput type="text"
                   :model-value="form.url"
                   :label="$t('passwords.list.form.new.url.label')"
        />

        <FormInput type="text"
                   :model-value="form.description"
                   :label="$t('passwords.list.form.new.description.label')"
        />

        <GroupSelect :options="groups"
                     v-model="form.group"
                     class="mb-6"
        />

        <PasswordWithConfirmation @both-passwords-changed="form.password = $event"
                                  @password-changed="form.password = $event"
        />

        <MediumButtonWithIcon :text="$t('passwords.list.form.new.submitButton.label')"
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

import GroupSelect              from "@/views/Modules/Passwords/Components/GroupSelect.vue";
import SimpleTable              from "@/components/Ui/Table/SimpleTable.vue";
import FormInput                from "@/components/Form/Input.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Base                     from "@/views/Modules/Base.vue";
import PasswordWithConfirmation from "@/components/Form/PasswordWithConfirmation.vue";

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
            label: 'Login',
            dataValuePath : 'login.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: 'Url',
            dataValuePath : 'url.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: 'Description',
            dataValuePath : 'description.value',
            dataIsComponentPath : 'name.isComponent',
            dataComponentPropertiesPath: null
          },
          {
            label: 'Group',
            dataValuePath : 'group.value',
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
              login : {
                value       : "name",
                isComponent : false,
              },
              url : {
                value       : "name",
                isComponent : false,
              },
              description : {
                value       : "name",
                isComponent : false,
              },
              group : {
                value       : "name",
                isComponent : false,
              },
              actions : {
                value       : "name",
                isComponent : false,
              }
            }
          },
          {
            values : {
              login : {
                value       : "login2",
                isComponent : false,
              },
              url : {
                value       : "url2",
                isComponent : false,
              },
              description : {
                value       : "description2",
                isComponent : false,
              },
              group : {
                value       : "group2",
                isComponent : false,
              },
              actions : {
                value       : "actions2",
                isComponent : false,
              }
            }
          }
        ]
      }
    }
  },
  components: {
    PasswordWithConfirmation,
    MediumButtonWithIcon,
    SimpleTable,
    GroupSelect,
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