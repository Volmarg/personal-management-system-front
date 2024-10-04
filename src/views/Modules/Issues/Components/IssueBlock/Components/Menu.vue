<template>
  <OnClickSmallMenu :is-menu-open="isMenuOpen">
    <Element>
      <a @click.prevent="$emit('viewEditClick')">{{$t('issues.pending.box.dashboard.menu.viewEdit')}}</a>
    </Element>
    <Element>
      <a @click.prevent="$emit('addRecordsClick')">{{$t('issues.pending.box.dashboard.menu.addRecords')}}</a>
    </Element>
    <Element>
      <a @click.prevent="$emit('handleRelatedTodoClick')"
         v-html="$t('issues.pending.box.dashboard.menu.relatedTodo')"
      />
    </Element>
    <Element>
      <a class="text-red-600"
         @click.prevent="$emit('removedClick')"
      >{{$t('issues.pending.box.dashboard.menu.remove')}}</a>
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
    "addRecordsClick",
    "handleRelatedTodoClick",
    "viewEditClick",
    "removedClick",
    "menuClose"
  ],
  components: {
    Element,
    OnClickSmallMenu
  },
}
</script>
