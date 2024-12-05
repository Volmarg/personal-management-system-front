<template>
  <Base :info-block-description="$t('goals.payments.description')"
        :is-in-container="false"
  >
    <Tabs :tabs-with-content="tabsContent" />

    <Container class="mt-4">
      <CreateUpdateForm @submit="onSubmit"/>
    </Container>

  </Base>
</template>

<script lang="ts">
import CreateUpdateForm from "@/views/Modules/Goals/Payments/CreateUpdateForm.vue";
import Container        from "@/components/Ui/Containers/Container.vue";
import Tabs             from "@/components/Navigation/Tabs/Tabs.vue";
import Base             from "@/views/Modules/Base.vue";

import TabList   from "@/views/Modules/Goals/Payments/TabList.vue";
import TabManage from "@/views/Modules/Goals/Payments/TabManage.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {PaymentsState} from "@/scripts/Vue/Store/Module/Goals/Payments/PaymentsState";

export default {
  data(): ComponentData {
    return {
      activePayment: null as null | Record,
    }
  },
  components: {
    CreateUpdateForm,
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
          tabName: this.$t('goals.payments.tab.list.header'),
          tabComponent: TabList,
          tabComponentProps: {}
        },
        {
          tabName: this.$t('goals.payments.tab.manage.header'),
          tabComponent: TabManage,
          tabComponentProps: {}
        }
      ];
    }
  },
  methods: {
    /**
     * @description updates the payments store after submitting the form
     */
    onSubmit(): void {
      PaymentsState().getAll();
    }
  }
}
</script>