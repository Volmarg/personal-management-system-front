<template>
  <Base :info-block-description="$t('notes.settings.description')">
    <SimpleTable :headers="table.headers"
                 :data="tableData"
    />

    <AddEditForm @form-submit="onNewSubmit"
                 :header="$t('notes.settings.form.header.new')"
    />

  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AddEditForm              from "@/views/Modules/Notes/Components/Settings/AddEditForm.vue";
import TableEditForm            from "@/views/Modules/Notes/Components/Settings/Actions/TableEditForm.vue";
import SimpleTable              from "@/components/Ui/Table/SimpleTable.vue";
import Base                     from "@/views/Modules/Base.vue";
import TableActions             from "@/components/Ui/Actions/TableActions.vue";

export default {
  data(): ComponentData {
    return {
      tableActionsData: {
        value          : TableActions,
        isComponent    : true,
        componentProps : {
          updateUrl: "edit-url/:id",
          deleteUrl: "delete-url/:id",
          idPropName: "id",
          editActionForm: TableEditForm
        }
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
            label: 'id',
            dataValuePath : 'id.value',
            isVisible: false,
            dataIsComponentPath : null,
            dataComponentPropertiesPath: null
          },
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
            dataValuePath : "actions.value",
            dataIsComponentPath : "actions.isComponent",
            dataComponentPropertiesPath: "actions.componentProps"
          },
        ],
      }
    }
  },
  components: {
    AddEditForm,
    SimpleTable,
    Base,
  },
  computed: {
    tableData(): Array {
      /**
       * @description dummy data for now
       */
      return [
        {
          values : {
            id : {
              value       : 1,
              isComponent : false,
            },
            category : {
              value       : "candies",
              isComponent : false,
            },
            parent : {
              value       : "sweets",
              isComponent : false,
            },
            actions: this.tableActionsData,
          }
        },
        {
          id : {
            value       : 2,
            isComponent : false,
          },
          values : {
            category : {
              value       : "cookiez",
              isComponent : false,
            },
            parent : {
              value       : "sweets",
              isComponent : false,
            },
            actions: this.tableActionsData,
          }
        }
      ]
    }
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