<template>
  <Base :info-block-description="$t('storage.page.addFiles.header')"
        :is-in-container="false"
  >
    <Upload :configuration-id="configurationId"
            :can-upload="canUpload"
            :extra-data="uploadExtraData"
            @upload-finished="$emit('uploadFinished', $event)"
    >
      <template #beforeActions>
        <ModuleWithFoldersSelect
            @module-select-change="selectedModule = $event"
            @folder-select-change="selectedPath = $event"
        />
      </template>
    </Upload>
  </Base>
</template>

<script lang="ts">
import ModuleWithFoldersSelect from "@/views/Modules/Storage/Upload/Components/ModuleWithFoldersSelect.vue";
import Upload                  from "@/components/Ui/Upload/Component/Upload.vue";
import Base                    from "@/views/Modules/Base.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      selectedModule: null,
      selectedPath: null,
      configurationId: 123,
    }
  },
  components: {
    Base,
    Upload,
    ModuleWithFoldersSelect,
  },
  computed: {
    /**
     * @description extra data sent by submitting upload form
     */
    uploadExtraData(): Record {
      return {
        module: this.selectedModule,
        path: this.selectedPath
      }
    },
    /**
     * @description check if upload is allowed or not
     */
    canUpload(): boolean {
      return this.selectedPath && this.selectedModule;
    }
  }
}
</script>