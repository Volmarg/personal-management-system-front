<template>
  <div class="flex justify-center flex-row">
    <div class="mt-6 md:w-1/2 lg:w-1/3 w-full flex flex-col">
      <h2 class="text-lg mb-5">{{ $t('storage.page.manage.tab.copyData.form.header') }}</h2>

      <h2 class="text-lg">{{ $t('storage.page.manage.tab.copyData.form.text.from.label') }}</h2>
      <ModuleWithFoldersSelect @module-select-change="form.from.selectedModule = $event"
                               @folder-select-change="form.from.selectedPath = $event"
                               ref="moduleWithDirSelectFrom"
                               class="mb-4 s"
      />

      <h2 class="text-lg">{{ $t('storage.page.manage.tab.copyData.form.text.to.label') }}</h2>
      <ModuleWithFoldersSelect @module-select-change="form.to.selectedModule = $event"
                               @folder-select-change="form.to.selectedPath = $event"
                               ref="moduleWithDirSelectTo"
                               class="mb-4 s"
      />

      <div class="mb-4 flex flex-row hover:opacity-70 cursor-pointer">
        <Checkbox class="transform scale-75"
                  v-model="form.moveWholeFolder"
                  ref="moveWholeFolder"
                  @click="onMoveClick"
        />
        <label class="checkbox checkbox-all align-self-center ml-1 cursor-pointer"
               @click="onMoveClick"
        >{{ $t('storage.page.manage.tab.copyData.form.moveInsteadCopy.label') }}</label>
      </div>

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
import Checkbox                from "@/components/Form/Checkbox.vue";

import FolderHandlerMixin from "@/views/Modules/Storage/Mixin/FolderHandlerMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      form: {
        from: {
          selectedModule: null,
          selectedPath: null,
        },
        to: {
          selectedModule: null,
          selectedPath: null,
        },
        moveWholeFolder: false
      }
    }
  },
  components: {
    Checkbox,
    MediumButtonWithIcon,
    ModuleWithFoldersSelect,
  },
  mixins: [
    FolderHandlerMixin,
  ],
  methods: {
    /**
     * @description handler for submitting the folder creation form
     */
    async onSubmit(): Promise<void> {
      let isSuccess = await this.moveOrCopyDir(
          this.form.from.selectedPath,
          this.form.to.selectedPath,
          this.form.moveWholeFolder,
          this.form.to.selectedModule,
      );

      if (isSuccess) {
        this.form.from.selectedPath = null;
        this.form.from.selectedModule = null;
        this.form.to.selectedPath = null;
        this.form.to.selectedModule = null;
        this.form.moveWholeFolder = false;
        this.$refs.moduleWithDirSelectFrom.reload();
        this.$refs.moduleWithDirSelectTo.reload();
      }
    },
    /**
     * @description toggle state of "move" checkbox
     */
    onMoveClick(): void {
      this.$refs.moveWholeFolder.toggle();
    }
  }
}
</script>