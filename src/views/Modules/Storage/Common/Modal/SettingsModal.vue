<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('storage.page.module.settingsModal.header')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <Wyswig :initial-value="description"
                :label="$t('storage.page.module.settingsModal.form.description.label')"
                v-model="description"
        />

        <MediumButtonWithIcon :text="$t('storage.page.module.settingsModal.form.submit.label')"
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
import Modal                    from "@/components/Modal/Modal.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import ResponseHandlerMixin     from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import MediumButtonWithIcon     from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Wyswig                   from "@/components/Form/Wyswig.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

export default {
  data(): ComponentData {
    return {
      storageState: null as StorageState | null,
      showModal: false,
      description: '',
      initialSmallSizeModal: "medium"
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
    Wyswig,
    Modal,
  },
  mixins: [
    ResponsiveModalSizeMixin,
    ResponseHandlerMixin,
  ],
  emits: [
    "modalClosed",
    "confirmClick",
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description update folder meta-data
     */
    onSubmit(): void {
      let data = {
        moduleName: StorageState().moduleName,
        description: this.description,
        dirPath: this.$route.query.dir,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_UPDATE_META_DATA)
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().clearSelectedFiles();
          StorageState().getAll();
          this.$emit('modalClosed');
        }
      })

    }

  },
  created(): void {
    this.storageState = StorageState();
  },
  updated(): void{
    this.showModal = this.isModalVisible;
  },
  watch: {
    /**
     * @description this is necessary because the active node data is not loaded right away, so description can't be set in hooks
     */
    'storageState.activeNodeData': {
      deep: true,
      handler: function(): void {
        this.description = StorageState().activeNodeData.description;
      }
    }
  }
}
</script>