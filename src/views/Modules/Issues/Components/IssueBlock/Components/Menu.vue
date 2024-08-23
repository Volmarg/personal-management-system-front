<template>
  <div class="dropdown absolute top-0 right-0 mt-8"
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
               @click.prevent="$emit('viewEditClick')"
            >{{$t('issues.pending.box.dashboard.menu.viewEdit')}}</a>
          </li>
          <li>
            <a class="menu-element"
               @click.prevent="$emit('addRecordsClick')"
               >{{$t('issues.pending.box.dashboard.menu.addRecords')}}</a>
          </li>
          <li>
            <a class="menu-element"
               @click.prevent="$emit('handleRelatedTodoClick')"
               v-html="$t('issues.pending.box.dashboard.menu.relatedTodo')"/>
          </li>
          <li>
            <a class="menu-element text-red-600"
               @click.prevent="$emit('removedClick')"
               >{{$t('issues.pending.box.dashboard.menu.remove')}}</a>
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
    "addRecordsClick",
    "handleRelatedTodoClick",
    "viewEditClick",
    "removedClick"
  ]
}
</script>

<style lang="scss" scoped>
.menu-element {
  @apply flex flex-row items-center justify-start h-10 w-full px-2 bg-white hover:bg-gray-100
}
</style>