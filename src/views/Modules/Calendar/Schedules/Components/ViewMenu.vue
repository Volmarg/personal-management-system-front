<template>
  <div class="dropdown absolute top-0 right-0 mt-8 calendar-view-menu"
       :class="{
          'open': isMenuOpen
       }"
  >
    <div class="dropdown-content w-48 bottom-start"
    >
      <div class="flex flex-col w-full">
        <ul class="list-none">
          <li>
            <a class="menu-element"
               @click.prevent="$emit('monthClick')"
            >{{$t('calendar.navbar.view.menu.month.label')}}</a>
          </li>
          <li>
            <a class="menu-element"
               @click.prevent="$emit('weekClick')"
            >{{$t('calendar.navbar.view.menu.week.label')}}</a>
          </li>
          <li>
            <a class="menu-element"
               @click.prevent="$emit('dayClick')"
            >{{$t('calendar.navbar.view.menu.day.label')}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
  ]
}
</script>

<style lang="scss" scoped>
.menu-element {
  @apply flex flex-row items-center justify-start h-10 w-full px-2 bg-white hover:bg-gray-100
}
</style>