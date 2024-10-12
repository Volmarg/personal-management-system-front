<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterNotes from "@/router/Modules/VueRouterNotes";

export default {
  data(): ComponentData {
    return {
      moduleIcon: {
        files: 'folder-open',
        images: 'image',
        video: 'film',
        notes: 'book',
      },
      moduleTranslation: {
        files: this.$t('navbar.rightSidebar.menu.files.label'),
        images: this.$t('navbar.rightSidebar.menu.images.label'),
        video: this.$t('navbar.rightSidebar.menu.video.label'),
        notes: this.$t('navbar.rightSidebar.menu.notes.label'),
      },
      modulePath: {
        files: '',
        images: '',
        video: '',
        notes: '',
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
     * @description returns the full url for the storage module
     */
    buildStorageUrl(path: string, dirname: string, basePath: string): string {
      return basePath.replace(":path", encodeURIComponent(path)).replace(":dirname", dirname);
    }
  }
}
</script>