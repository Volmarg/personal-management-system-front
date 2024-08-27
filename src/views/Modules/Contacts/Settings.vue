<template>
  <Base :info-block-description="$t('contacts.settings.description')">
    <Tabs :tabs-with-content="buildTabsContent()" />
  </Base>
</template>

<script lang="ts">
import Tabs from "@/components/Navigation/Tabs/Tabs.vue";
import Base from "@/views/Modules/Base.vue";

import TabContactType from "@/views/Modules/Contacts/Components/Settings/TabContactType.vue";
import TabContactGroup from "@/views/Modules/Contacts/Components/Settings/TabContactGroup.vue";

export default {
  components: {
    Base,
    Tabs
  },
  methods: {
    buildTabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName           : this.$t('contacts.settings.tabs.contactType.label'),
          tabComponent      : TabContactType,
          tabComponentProps : {
          }
        },
        {
          tabName      : this.$t('contacts.settings.tabs.contactGroup.label'),
          tabComponent : TabContactGroup,
          tabComponentProps  : {
          }
        }
      ];
    },
  }
}
</script>
