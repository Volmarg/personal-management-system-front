<template>
  <Base :info-block-description="$t('storage.page.manage.header')">
    <Tabs :tabs-with-content="buildTabsContent()" />
  </Base>
</template>

<script lang="ts">
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";
import Base from "@/views/Modules/Base.vue";

import TabRenameFolder from "@/views/Modules/Storage/Upload/Components/Manage/TabRenameFolder.vue";
import TabCreateFolder from "@/views/Modules/Storage/Upload/Components/Manage/TabCreateFolder.vue";
import TabCopyData     from "@/views/Modules/Storage/Upload/Components/Manage/TabCopyData.vue";

export default {
  components: {
    Base,
    Tabs
  },
  methods: {
    buildTabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName           : this.$t('storage.page.manage.tab.renameFolder.header'),
          tabComponent      : TabRenameFolder,
          tabComponentProps : {}
        },
        {
          tabName      : this.$t('storage.page.manage.tab.createFolder.header'),
          tabComponent : TabCreateFolder,
          tabComponentProps  : {}
        },
        {
          tabName      : this.$t('storage.page.manage.tab.copyData.header'),
          tabComponent : TabCopyData,
          tabComponentProps  : {}
        }
      ];
    },
  }
}
</script>

<style lang="scss">
.module-with-folder-select {
  @apply h-auto
}
</style>
