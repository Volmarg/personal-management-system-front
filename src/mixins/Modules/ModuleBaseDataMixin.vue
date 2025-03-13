<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterNotes from "@/router/Modules/VueRouterNotes";

import {StorageTypeEnum} from "@/scripts/Vue/Store/Module/Storage/StorageState";

export default {
  data(): ComponentData {
    return {
      moduleIcon: {
        [StorageTypeEnum[StorageTypeEnum.files]]: 'folder-open',
        [StorageTypeEnum[StorageTypeEnum.images]]: 'image',
        [StorageTypeEnum[StorageTypeEnum.videos]]: 'film',
        notes: 'book',
      },
      moduleTranslation: {
        [StorageTypeEnum[StorageTypeEnum.files]]: this.$t('navbar.rightSidebar.menu.files.label'),
        [StorageTypeEnum[StorageTypeEnum.images]]: this.$t('navbar.rightSidebar.menu.images.label'),
        [StorageTypeEnum[StorageTypeEnum.videos]]: this.$t('navbar.rightSidebar.menu.videos.label'),
        notes: this.$t('navbar.rightSidebar.menu.notes.label'),
      }
    }
  },
  methods: {
    /**
     * @description build url to notes category
     */
    buildNotesCategoryUrl(id: number): string {
      return VueRouterNotes.ROUTE_PATH_NOTES_CATEGORY.replace(":id", id);
    },
    /**
     * @description returns the full url for the storage module. This could be changed at some point to maybe track storage dir
     *              via pinia just to make the url prettier if ever needed.
     */
    buildStorageUrl(path: string, basePath: string): string {
      return basePath + `?dir=${path}`
    }
  }
}
</script>