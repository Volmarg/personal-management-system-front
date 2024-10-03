<template>
  <div>
    <li class="l1 single-menu-element w-full">
      <router-link  :to="{name: routeName, params: routeParams}"
                    class="left-sidebar-item setting-nav-element"
                    :class="{
                      'active' : isActive,
                    }"
      >

        <div class="ml-2 icon-label-container">
          <slot name="icon"></slot>
          <span class="title ml-4">{{ label }}</span>
        </div>

      </router-link>
    </li>
  </div>
</template>

<script lang="ts">
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  props: {
    label: {
      type     : String,
      required : true,
    },
    routeName: {
      type     : String,
      required : true,
    },
    routeParams: {
      type     : Object,
      required : false,
      default  : () => {
        return {};
      }
    }
  },
  mixins: [
    ResponsiveVarsMixin
  ],
  computed: {
    /**
     * @description check if the given menu element is active or not
     */
    isActive(): boolean {
      return (this.$route.name === this.routeName);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';

.setting-nav-element {
  width: 100% !important;
}

@media screen and (max-width: $tabletBreakingPointPx + 'px') {
  .setting-nav-element {
    max-width: 100% !important;
    display: flex;
    justify-content: center;
  }

  .icon-label-container {
    min-width: 130px !important;
    display: flex;
    justify-content: flex-start;
  }
}
</style>