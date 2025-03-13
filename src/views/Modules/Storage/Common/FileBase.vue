<template>
  <div :class="{
          'selected': isSelected
        }"
       class="file-base-main-wrapper"
  >
    <div>
      <div v-tippy="{
          content: hoverContent,
          position: 'top',
          touch: true,
        }"
           @click="selectOnFileRepresentationClick ? $refs.checkbox.toggle() : null"
           class="file-representation"
           ref="fileRepresentation"
      >
        <slot name="fileRepresentation"></slot>
      </div>

      <div class="file-name-wrapper"
           :class="{
              [`file-name-wrapper-${moduleName}`]: true
           }"
           @click="$refs.checkbox.toggle()"
           ref="fileNameWrapper"
           :style="{
              'max-width': `${textWrapperMaxWidth} !important`
           }"
      >
        {{ fileName }}
      </div>
    </div>

    <div class="file-actions">
      <Checkbox class="transform scale-75"
                v-tippy="$t('storage.nav.button.select.label')"
                v-model="isSelected"
                ref="checkbox"
      />
      <a :href="fileUrl"
         download
      >
        <fa icon="download"
            class="text-lg cursor-pointer hover:opacity-70 download"
            v-tippy="$t('storage.nav.button.download.label')"
        />
      </a>

      <div :href="fileUrl"
            @click="copyLink"
      >
        <fa icon="link"
            class="text-lg cursor-pointer hover:opacity-70"
            v-tippy="$t('storage.nav.button.link.label')"
        />
      </div>

      <fa icon="edit"
          class="text-lg cursor-pointer hover:opacity-70 edit"
          v-tippy="$t('storage.nav.button.edit.label')"
          @click="$emit('editClick'); isEditModalVisible=true"
      />
    </div>


    <EditModal :is-modal-visible="isEditModalVisible"
               :file-data="fileData"
               @modal-closed="isEditModalVisible=false"
    />

  </div>

</template>

<script lang="ts">
import FileHandlerMixin from "@/views/Modules/Storage/Mixin/FileHandlerMixin.vue";

import Checkbox  from "@/components/Form/Checkbox.vue";
import EditModal from "@/views/Modules/Storage/Common/Modal/EditModal.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {StorageState, StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

import ClipboardService from "@/scripts/Core/Services/ClipboardService";

export default {
  data(): ComponentData {
    return {
      textWrapperMaxWidth: 'auto',
      isEditModalVisible: false,
      isSelected: false,
      filenameMaxLen: 30,
    }
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    },
    dirNodeData: {
      type: Object,
      required: true,
    },
    moduleName: {
      type: String,
      required: true,
    },
    useImgWidthForTextWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    selectOnFileRepresentationClick: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  emits: [
    "editClick",
  ],
  mixins: [
    FileHandlerMixin
  ],
  components: {
    Checkbox,
    EditModal
  },
  computed: {
    /**
     * @description returns shown filename
     */
    fileName(): string {
      let name = this.fileData.name;
      if (this.fileData.ext) {
        name += `.${this.fileData.ext}`;
      }

      if (name.length <= this.filenameMaxLen) {
        return name;
      }

      return name.substr(0, this.filenameMaxLen) + "..."
    },
    /**
     * @description content of the file during hover
     */
    hoverContent(): string {
      let tags = '<div class="in-hover-tags">';
      for (let tag of this.fileData.tags) {
        tags += `<span class='in-hover-tag'>${tag}</span>`;
      }

      tags += '</div>';

      return `
        <div class="hover-content-wrapper">
          <b>${this.$t('storage.fileHoverData.text.fileName')}</b>: ${this.fileData.name}.${this.fileData.ext}
          <br><br>
          <b>${this.$t('storage.fileHoverData.text.size')}</b>: ${this.fileData.size}
          <br><br>
          <b>${this.$t('storage.fileHoverData.text.tags')}</b><br>
          ${tags}
        </div>
      `
    }
  },
  methods: {
    /**
     * @description returns the text wrapper max width
     */
    setTextWrapperMaxWidth(): void {
      if (!this.useImgWidthForTextWidth) {
        this.textWrapperMaxWidth = 'auto';
      }

      if (this.moduleName === StorageTypeEnum[StorageTypeEnum.images]) {
        this.textWrapperMaxWidth = `${getComputedStyle(this.$refs.fileRepresentation.querySelector('img')).width}`;
        return
      }

      this.textWrapperMaxWidth = `${this.$refs.fileRepresentation.offsetWidth}px`;
    },
    /**
     * @description copies link to clipboard
     */
    copyLink(): void {
      ClipboardService.copyToClipboard(this.fileUrl);
    }
  },
  mounted(): void {
    this.setTextWrapperMaxWidth();
  },
  watch: {
    isSelected(): void {
      if (this.isSelected) {
        StorageState().selectFile(this.fileData);
        return;
      }

      StorageState().deselectFile(this.fileData);
    }
  }
}
</script>


<style lang="scss">
.hover-content-wrapper {
  max-width: 200px;
}

.in-hover-tag {
  @apply p-1 border rounded-xl
}

.in-hover-tags {
  @apply mt-2 mb-2 space-x-1 space-y-1 flex flex-wrap
}

.selected{
  img {
    @apply border-blue-500 border-2
  }

  .file-name-wrapper {
    @apply text-blue-500
  }
}

.file-name-wrapper {
  @apply break-all
}

.file-actions {
  @apply flex flex-row justify-between mt-1
}


.file-representation {
  @apply hover:opacity-70
}
</style>