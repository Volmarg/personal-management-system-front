<template>
  <div>
    <Container>
      <slot></slot>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from "@/components/Ui/Containers/Container.vue";
export default {
  components: {
    Container
  }
}
</script>