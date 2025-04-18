<template>
  <div class="flex justify-center flex-row">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg">{{ $t('storage.page.manage.tab.createFolder.form.header') }}</h2>

      <ModuleWithFoldersSelect @module-select-change="form.selectedModule = $event"
                               @folder-select-change="form.selectedPath = $event"
                               ref="moduleWithDirSelect"
                               class="mb-4 s"
      />

      <FormInput type="text"
                 v-model="form.folderName"
                 :is-required="true"
                 :label="$t('storage.page.manage.tab.createFolder.form.name.label')"
      />

      <MediumButtonWithIcon :text="$t('storage.page.manage.tab.createFolder.form.submit.label')"
                            button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                            class="w-full mb-1 md:col-start-1 md:col-end-2"
                            button-classes="w-full md:w-auto m-0-force"
                            text-classes="text-center w-full"
                            @button-click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ModuleWithFoldersSelect from "@/views/Modules/Storage/Common/ModuleWithFoldersSelect.vue";
import MediumButtonWithIcon    from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import FormInput               from "@/components/Form/Input.vue";
import FolderHandlerMixin      from "@/views/Modules/Storage/Mixin/FolderHandlerMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        selectedModule: null,
        selectedPath: null,
        folderName: null
      }
    }
  },
  components: {
    FormInput,
    MediumButtonWithIcon,
    ModuleWithFoldersSelect,
  },
  mixins: [
    FolderHandlerMixin
  ],
  methods: {
    /**
     * @description handler for submitting the folder creation form
     */
    async onSubmit(): Promise<void> {
      let isSuccess = await this.addFolder(this.form.selectedPath, this.form.folderName);
      if (isSuccess) {
        this.form.folderName = null;
        this.form.selectedModule = null;
        this.form.folderName = null;
        this.$refs.moduleWithDirSelect.reload();
      }
    }
  }
}
</script>