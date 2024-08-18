<template>
  <div>
    <Row :is-content-equally-distributed="true"
         :flex-direction="rowFlexDirection"
    >
      <RemoveAccount />
    </Row>

  </div>
</template>

<script lang="ts">

import ResponsiveViewNavMixin from "@/views/User/Settings/Views/Mixin/ResponsiveViewNavMixin.vue";

import Row          from "@/components/Ui/Row.vue";
import RemoveAccount from "@/views/User/Settings/Views/Account/components/RemoveAccount.vue";

export default {
  mixins: [
    ResponsiveViewNavMixin
  ],
  components: {
    RemoveAccount,
    Row
  }
}
</script>