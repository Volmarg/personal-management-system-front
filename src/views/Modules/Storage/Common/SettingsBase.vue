<template>
  <Container>

    <p v-html="description" />

  </Container>
</template>

<script lang="ts">
import Container from "@/components/Ui/Containers/Container.vue";

export default {
  props: {
    description: {
      type: String,
      required: true,
    }
  },
  components: {
    Container
  },
}
</script>