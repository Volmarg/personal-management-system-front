<template>
  <Base :info-block-description="$t('job.holidays.description')"
        :is-in-container="false"
  >
    <Container>
      <Tabs :tabs-with-content="tabsContent" />
    </Container>

    <Container class="mt-4">
      <AddEditForm :header="$t('job.holidays.shared.form.header')"
                   @submit="getData"
      />
    </Container>

  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import AddEditForm from "@/views/Modules/Job/Holidays/AddEditForm.vue";
import Container   from "@/components/Ui/Containers/Container.vue";
import Tabs        from "@/components/Navigation/Tabs/Tabs.vue";
import Base        from "@/views/Modules/Base.vue";

import TabSpent   from "@/views/Modules/Job/Holidays/TabSpent.vue";
import TabSummary from "@/views/Modules/Job/Holidays/TabSummary.vue";

import {PoolsState}      from "@/scripts/Vue/Store/Module/Job/Holidays/PoolsState";
import {DaysSpentState}  from "@/scripts/Vue/Store/Module/Job/Holidays/DaysSpentState";
import {StoreDefinition} from "pinia";

export default {
  data(): ComponentData {
    return {
      poolsStore: null as null | StoreDefinition,
      daysSpentStore: null as null | StoreDefinition,
      pools: [],
      holidays: [],
      form: {
        daysSpent: null,
        information: null,
        year: null
      }
    }
  },
  components: {
    AddEditForm,
    Container,
    Base,
    Tabs,
  },
  computed: {
    /**
     * @description returns the data structure for tabs
     */
    tabsContent(): Array<Record<string, unknown>> {
      return [
        {
          tabName: this.$t('job.holidays.tabs.summary.label'),
          tabComponent: TabSummary,
          tabComponentProps: {
            pools: this.pools,
            holidays: this.holidays,
          }
        },
        {
          tabName: this.$t('job.holidays.tabs.spent.label'),
          tabComponent: TabSpent,
          tabComponentProps: {
            holidays: this.holidays,
          }
        }
      ];
    }
  },
  methods: {
    /**
     * @description fetches and assigns the data used for tabs
     */
    async getData(): Promise<void> {
      await Promise.allSettled([
        this.poolsStore.getAll(),
        this.daysSpentStore.getAll(),
      ])

      this.pools = this.poolsStore.allEntries;
      this.holidays = this.daysSpentStore.allEntries;
    },
  },
  beforeMount(): void {
    this.poolsStore = PoolsState();
    this.daysSpentStore = DaysSpentState();
    this.getData();
  },
  watch: {
    'poolsStore.allEntries': {
      deep: true,
      handler: function () {
        this.pools = this.poolsStore.allEntries;
      }
    },
    'daysSpentStore.allEntries': {
      deep: true,
      handler: function () {
        this.holidays = this.daysSpentStore.allEntries;
      }
    }
  }
}
</script>