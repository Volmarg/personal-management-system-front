<template>
  <Base :info-block-description="$t('health.overview.description')">
    <Tabs :tabs-with-content="tabsContent"
          id="healthOverview"
    />
  </Base>
</template>

<script lang="ts">

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Tabs         from "@/components/Navigation/Tabs/Tabs.vue";
import TabDoctors   from "@/views/Modules/Health/Components/Overview/TabDoctors.vue";
import TabIllnesses from "@/views/Modules/Health/Components/Overview/TabIllnesses.vue";
import Base         from "@/views/Modules/Base.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        currencyMultiplier: null,
      }
    }
  },
  components: {
    Base,
    Tabs,
  },
  computed: {
    /**
     * @description builds the switchable tabs content
     */
    tabsContent(): Array {
      return [
        {
          tabName: this.$t('health.overview.tabs.doctors.label'),
          tabComponent: TabDoctors,
        },
        {
          tabName: this.$t('health.overview.tabs.illnesses.label'),
          tabComponent: TabIllnesses,
        },
      ];
    }
  },
}
</script>
