<template>
  <div>

    <WarningModal :is-visible="showModal"
                  id="storage-folder-remove"
                  :title="$t('storage.page.module.removeFolderModal.header.label')"
                  @modal-closed="onModalClosed"
                  @confirm="onSubmit"
                  :size="modalSize"
    >
      <template #content>
        <p class="mb-2">{{ $t('storage.page.module.removeFolderModal.description.line1') }}</p>
        <p class="mb-2"
           v-html="$t('storage.page.module.removeFolderModal.description.line2')"
        />
      </template>
    </WarningModal>

  </div>
</template>

<script lang="ts">
import WarningModal from "@/components/Modal/WarningModal.vue";

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
  },
  mixins: [
    ResponseHandlerMixin,
    ResponsiveModalSizeMixin,
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description removes folder from the server
     */
    onSubmit(): void {
      let data = {
        dirPath: this.$route.query.dir,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_REMOVE_URL)
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
