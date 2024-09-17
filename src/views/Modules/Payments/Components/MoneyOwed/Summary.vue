<template>
  <div v-if="data.length > 0">

  </div>

  <NoResultsText v-else />
</template>

<script lang="ts">
import NoResultsText from "@/components/Page/NoResultsText.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    NoResultsText,
  },
}
</script>
