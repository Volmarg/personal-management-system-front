<template>
  <div>
    <Modal :is-visible="showModal"
           :title="$t('storage.page.module.updateModal.header.label')"
           @modal-closed="onModalClosed"
           :size="modalSize"
    >
      <template #content>
        <div class="flex justify-center">
          <div class="w-full flex flex-col">

            <FormInput type="text"
                       :is-required="true"
                       :label="$t('storage.page.module.updateModal.form.name.label')"
                       v-model="name"
            />

            <TagInput v-model="tags"/>

            <MediumButtonWithIcon :text="$t('storage.page.module.updateModal.form.submit.label')"
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
import ResponseHandlerMixin     from "@/scripts/Vue/Mixins/ResponseHandlerMixin.vue";
import ResponsiveModalSizeMixin from "@/mixins/Responsive/ResponsiveModalSizeMixin.vue";

import FormInput            from "@/components/Form/Input.vue";
import TagInput             from "@/components/Form/TagInput.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import SymfonyStorageRoutes from "@/router/SymfonyRoutes/Modules/SymfonyStorageRoutes";

import {StorageState} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  data(): ComponentData {
    return {
      name: '',
      tags: [],
      showModal: false,
    }
  },
  props: {
    isModalVisible: {
      type     : Boolean,
      required : true,
      default  : false,
    },
    fileData: {
      type: Object,
      required: true,
    }
  },
  components: {
    MediumButtonWithIcon,
    Modal,
    TagInput,
    FormInput,
  },
  mixins: [
    ResponseHandlerMixin,
    ResponsiveModalSizeMixin,
  ],
  emits: [
    "modalClosed",
    "updateSuccess",
  ],
  methods: {
    /**
     * @description handles the situation when modal get closed. Will pass the event further
     */
    onModalClosed(): void {
      this.$emit('modalClosed');
    },
    /**
     * @description updates the file data on backend
     */
    onSubmit(): void {
      let currFileName = this.fileData.name;
      let newFileName = this.name;
      if (this.fileData.ext) {
        currFileName += `.${this.fileData.ext}`;
        newFileName += `.${this.fileData.ext}`;
      }

      let data = {
        currFileName: currFileName,
        newFileName: newFileName,
        dirPath: this.$route.query.dir,
        tags: this.tags,
      };

      let url = SymfonyStorageRoutes.buildUrl(SymfonyStorageRoutes.FILE_UPDATE_URL)
      this.$axios.post(url, data).then((response) => {
        if (this.handleResponse(response)) {
          StorageState().getAll();
          this.$emit('modalClosed');
        }
      })

    },
  },
  updated(): void{
    this.showModal = this.isModalVisible;
    this.tags = this.fileData.tags;
    this.name = this.fileData.name;
  }
}
</script>