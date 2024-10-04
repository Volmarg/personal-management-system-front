<template>
  <OnClickSmallMenu :is-menu-open="isMenuOpen"
                    @menu-close="$emit('menuClose')"
  >
    <Element>
      <a @click.prevent="$emit('monthClick')">{{$t('calendar.navbar.view.menu.month.label')}}</a>
    </Element>
    <Element>
      <a @click.prevent="$emit('weekClick')">{{$t('calendar.navbar.view.menu.week.label')}}</a>
    </Element>
    <Element>
      <a @click.prevent="$emit('dayClick')" >{{$t('calendar.navbar.view.menu.day.label')}}</a>
    </Element>
  </OnClickSmallMenu>
</template>

<script lang="ts">
import OnClickSmallMenu from "@/components/Ui/Navigation/OnClickSmallMenu.vue";
import Element          from "@/components/Ui/Navigation/OnClickSmallMenu/Element.vue";

export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    "monthClick",
    "weekClick",
    "dayClick",
    'menuClose'
  ],
  components: {
    OnClickSmallMenu,
    Element
  }
}
</script>

<style lang="scss" scoped>
.menu-element {
  @apply flex flex-row items-center justify-start h-10 w-full px-2 bg-white hover:bg-gray-100
}
</style>