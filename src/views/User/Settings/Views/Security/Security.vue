<template>
  <div>
    <Row :is-content-equally-distributed="true"
         :flex-direction="rowFlexDirection"
    >
      <ChangePassword />
      <ChangeLockPassword />
    </Row>

  </div>
</template>

<script lang="ts">
import ChangeLockPassword from "@/views/User/Settings/Views/Security/components/ChangeLockPassword.vue";
import ChangePassword     from "@/views/User/Settings/Views/Security/components/ChangePassword.vue";
import Row                from "@/components/Ui/Row.vue";

import ResponsiveViewNavMixin from "@/views/User/Settings/Views/Mixin/ResponsiveViewNavMixin.vue";

export default {
  mixins: [
    ResponsiveViewNavMixin
  ],
  components: {
    ChangeLockPassword,
    ChangePassword,
    Row
  }
}
</script>