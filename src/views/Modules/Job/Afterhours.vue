<template>
  <Base :info-block-description="$t('job.afterhours.description')"
        :is-in-container="false"
  >

    <Container>
      <Tabs :tabs-with-content="tabsContent" />
    </Container>

    <Container class="mt-4">
      <AddEditForm @submit="store.getAll"
                   :header="$t('job.afterhours.new.form.header')"
      />
    </Container>

  </Base>
</template>

<script lang="ts">
import Base        from "@/views/Modules/Base.vue";
import Container   from "@/components/Ui/Containers/Container.vue";
import AddEditForm from "@/views/Modules/Job/Afterhours/AddEditForm.vue";
import Tabs        from "@/components/Navigation/Tabs/Tabs.vue";

import TabMade    from "@/views/Modules/Job/Afterhours/TabMade.vue";
import TabSpent   from "@/views/Modules/Job/Afterhours/TabSpent.vue";
import TabSummary from "@/views/Modules/Job/Afterhours/TabSummary.vue";

import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import {StoreDefinition} from "pinia";
import {AfterhoursState} from "@/scripts/Vue/Store/Module/Job/Afterhours/AfterhoursState";


export default {
  data(): ComponentData {
    return {
      store: null as null | StoreDefinition,
      afterhours: [],
    }
  },
  components: {
    Tabs,
    Container,
    Base,
    AddEditForm,
  },
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('job.afterhours.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {
            afterhours: this.afterhours,
          }
        },
        {
          tabName: this.$t('job.afterhours.tabs.made.label'),
          tabComponent: TabMade,
          tabComponentProps: {
            afterhours: this.afterhours.filter((afterhour: Record) => afterhour.type == "made"),
          }
        },
        {
          tabName: this.$t('job.afterhours.tabs.spent.label'),
          tabComponent: TabSpent,
          tabComponentProps: {
            afterhours: this.afterhours.filter((afterhour: Record) => afterhour.type == "spent"),
          }
        }
      ];
    },
  },
  async beforeMount(): Promise<void> {
    this.store = AfterhoursState();
    await this.store.getAll();
    this.afterhours = this.store.allEntries;
  },
  watch: {
    'store.allEntries': {
      deep: true,
      handler: function() {
        this.afterhours = this.store.allEntries;
      }
    }
  }
}
</script>