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
           @click="$refs.checkbox.toggle()"
           class="file-representation"
      >
        <slot name="fileRepresentation"></slot>
      </div>

      <div class="file-name-wrapper"
           @click="$refs.checkbox.toggle()"
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
      <fa icon="download"
          class="text-lg cursor-pointer hover:opacity-70 download"
          v-tippy="$t('storage.nav.button.download.label')"
          @click="$emit('downloadClick')"
      />

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
import Checkbox  from "@/components/Form/Checkbox.vue";
import EditModal from "@/views/Modules/Storage/Common/Modal/EditModal.vue";

import {ComponentData}      from "@/scripts/Vue/Types/Components/types";
import {storageModuleState} from "@/scripts/Vue/Store/StorageModuleState";

export default {
  data(): ComponentData {
    return {
      isEditModalVisible: false,
      isSelected: false,
      filenameMaxLen: 30,
    }
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    }
  },
  emits: [
    "downloadClick",
    "editClick",
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
      let name = `${this.fileData.name}.${this.fileData.ext}`;
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
  watch: {
    isSelected(): void {
      if (this.isSelected) {
        storageModuleState().addSelectedFiles(this.fileData);
        return;
      }

      storageModuleState().removeSelectedFile(this.fileData);
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

.selected .file-name-wrapper {
  @apply text-blue-500
}

.file-name-wrapper {
  max-width: 100px;
  @apply break-all
}

.file-actions {
  @apply flex flex-row justify-around mt-1
}
</style>