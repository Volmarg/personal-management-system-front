<template>
  <Badge v-for="tag in tags"
         :key="tag"
         class="my-1 mx-1"
  >
    {{ tag }}
  </Badge>
</template>

<script lang="ts">
import Badge from "@/components/Ui/Badge/Badge.vue";

export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  components: {
    Badge
  },
}
</script>
