<template>
  <div>

    <WarningModal :is-visible="showModal"
                  id="storage-file-remove"
                  :title="$t('storage.page.module.removeModal.header.label')"
                  @modal-closed="onModalClosed"
                  @confirm="onSubmit"
                  :size="modalSize"
    >
      <template #content>
        <p class="mb-2">{{ $t('storage.page.module.removeModal.description') }}</p>
        <hr />
        <div class="flex justify-center flex-row">
          <ul class="files-list">
            <li v-for="fileData in selectedFiles"
                :key="JSON.stringify(fileData)"
                class="flex flex-row"
            >
              <UnicodeArrow class="align-self-start mr-2"/>
              <span class="file-name">{{ fileData.name }} {{ fileData.ext ? `.${fileData.ext}` : '' }}</span>
            </li>
          </ul>
        </div>
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal from "@/components/Modal/WarningModal.vue";
import UnicodeArrow from "@/components/Ui/Icons/UnicodeArrow.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import ResponseHandlerMixin     from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";


export default {
  emits: [
    "modalClosed",
  ],
  data(): ComponentData {
    return {
      showModal: false,
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
    WarningModal,
    UnicodeArrow,
  },
  mixins: [
    ResponseHandlerMixin,
    ResponsiveModalSizeMixin,
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
     * @description removes files from the server
     */
    onSubmit(): void {
      let fileNames = [];
      for (let file of this.selectedFiles) {
        let fileName = file.name + (file.ext ? `.${file.ext}` : '');
        fileNames.push(fileName);
      }

      let data = {
        fileNames: fileNames,
        dirPath: this.$route.query.dir,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FILE_REMOVE_URL)
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().clearSelectedFiles();
          StorageState().getAll();
          this.$emit('modalClosed');
        }
      })

    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  }
}
</script>

<style lang="scss" scoped>
.files-list {
  $width:300px;
  width: $width;
  max-width: $width;

  li {
    @apply mt-2
  }
}

.file-name {
  @apply break-all text-left
}
</style>