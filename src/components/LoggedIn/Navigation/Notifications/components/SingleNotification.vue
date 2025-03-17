<template>
  <li class="dropdown-item border border-t-0 border-l-0 border-r-0">
    <span class="notification-element"
          :class="{
            [classes]: true
          }"
    >
      <span class="icon">
        <fa :icon="icon"
            class="absolute -mt-2 text-lg"
        />
      </span>
      <span class="label text-left">
        {{ notification.text }}
      </span>
    </span>
  </li>
</template>

<script lang="ts">
export default {
  computed: {
    /**
     * @description icon show in the notification list
     */
    icon(): Array {
      switch (this.notification.group) {
        case "schedule":
          return ['far', 'calendar-alt']
        default:
          return ['far', 'bell']
      }
    },
    /**
     * @description class per notification type
     */
    classes(): string {
      switch (this.notification.type) {
        case "warn":
          return "text-orange-500";
        case "error":
          return "text-red-500";
        case "critical":
          return "text-red-500 font-bold";
        default:
          return 'text-black';
      }
    }
  },
  props: {
    notification: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-element {
  @apply flex flex-row items-center justify-between h-10 w-full px-2
}

.icon {
  max-width: 30px !important;
  @apply inline-block -mt-3
}

.label {
  @apply mr-2 ml-10 w-full
}
</style>
