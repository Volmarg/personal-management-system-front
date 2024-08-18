<template>

  <FixedGoToTop class="go-to-top quick-nav-element opacity-50" />
  <FixedGoToBottom class="go-to-bottom quick-nav-element opacity-50" />

</template>

<script lang="ts">
import FixedGoToTop    from "@/components/Ui/Navigation/QuickTopBottom/FixedGoToTop.vue";
import FixedGoToBottom from "@/components/Ui/Navigation/QuickTopBottom/FixedGoToBottom.vue";

export default {
  components: {
    FixedGoToTop,
    FixedGoToBottom,
  }
}
</script>

<style lang="scss" scoped>
/*
  Keep in mind that the placement of the navigation is selected on purpose
  because some pages already got floating boxes and these could be overlapping
  For example:
  - page with offers found for given search
 */

.go-to-top {
  bottom: 52%;
}

.go-to-bottom {
  bottom: 45%;
}

.quick-nav-element {
  transform: scale(0.8);
  &:hover {
    opacity: 0.75;
  }
}

</style>