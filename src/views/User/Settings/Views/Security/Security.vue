<template>
  <div>
    <Row :is-content-equally-distributed="true"
         :flex-direction="rowFlexDirection"
    >
      <ChangePassword />
    </Row>

  </div>
</template>

<script lang="ts">
import ChangePassword  from "@/views/User/Settings/Views/Security/components/ChangePassword.vue";
import Row             from "@/components/Ui/Row.vue";

import ResponsiveViewNavMixin from "@/views/User/Settings/Views/Mixin/ResponsiveViewNavMixin.vue";

export default {
  mixins: [
    ResponsiveViewNavMixin
  ],
  components: {
    ChangePassword,
    Row
  }
}
</script>