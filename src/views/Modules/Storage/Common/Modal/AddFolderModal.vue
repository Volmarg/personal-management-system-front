<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('storage.page.module.newFolderModal.header.label')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <div class="flex justify-center">
          <div class="w-full flex flex-col">

            <FormInput type="text"
                       :label="$t('storage.page.module.newFolderModal.form.name.label')"
                       v-model="name"
            />

            <MediumButtonWithIcon :text="$t('storage.page.module.newFolderModal.form.submit.label')"
                                  button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                                  class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                                  button-classes="w-full md:w-auto m-0-force"
                                  text-classes="text-center w-full"
                                  @button-click="onSubmit"
            />

          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal                    from "@/components/Modal/Modal.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";
import ResponseHandlerMixin     from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";


import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  data(): ComponentData {
    return {
      name: '',
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
    MediumButtonWithIcon,
    FormInput,
    Modal,
  },
  mixins: [
    ResponseHandlerMixin,
    ResponsiveModalSizeMixin,
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
     * @description creates new folder on the server
     */
    onSubmit(): void {
      let data = {
        parentDir: this.$route.query.dir,
        newDirName: this.name,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FOLDER_CREATE_URL);
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().clearSelectedFiles();
          StorageState().getAll();
          this.name = '';
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