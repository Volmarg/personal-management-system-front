<template>
  <div>
    <Modal :is-visible="showModal"
           id="storage-file-move"
           :title="$t('storage.page.module.moveModal.header')"
           @modal-closed="onModalClosed"
           @confirm="onSubmit"
           :size="modalSize"
    >
      <template #content>
        <ModuleWithFoldersSelect
            @module-select-change="selectedModule = $event"
            @folder-select-change="selectedPath = $event"
        />

        <MediumButtonWithIcon :text="$t('storage.page.module.moveModal.form.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onSubmit"
        />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import ModuleWithFoldersSelect from "@/views/Modules/Storage/Common/ModuleWithFoldersSelect.vue";
import MediumButtonWithIcon    from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Modal                   from "@/components/Modal/Modal.vue";

import ResponseHandlerMixin     from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

export default {
  data(): ComponentData {
    return {
      showModal: false,
      selectedModule: null,
      selectedPath: null,
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    }
  },
  components: {
    MediumButtonWithIcon,
    Modal,
    ModuleWithFoldersSelect,
  },
  mixins: [
    ResponsiveModalSizeMixin,
    ResponseHandlerMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
  ],
  computed: {
    /**
     * @description returns selected files data
     */
    selectedFiles(): Array<Record> {
      return StorageState().selectedFilesData;
    }
  },
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description moves files around
     */
    onSubmit(): void {
      let fileNames = [];
      for (let file of this.selectedFiles) {
        let fileName = file.name + (file.ext ? `.${file.ext}` : '');
        fileNames.push(fileName);
      }

      let data = {
        fileNames: fileNames,
        newDirPath: this.selectedPath,
        currDirPath: this.$route.query.dir,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FILE_MOVE_URL)
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().clearSelectedFiles();
          StorageState().getAll();
          this.$emit('modalClosed');
        }
      })

    }
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>