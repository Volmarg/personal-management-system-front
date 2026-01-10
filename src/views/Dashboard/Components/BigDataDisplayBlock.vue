<template>
  <div>
    <Container>
      <h2 class="text-xl mb-5 font-bold">
        {{ header }}
        <fa icon="lock"
            class="text-red-500 text-tiny"
            v-if="isLocked"
        />
      </h2>
      <slot></slot>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from "@/components/Ui/Containers/Container.vue";
export default {
  components: {
    Container
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>