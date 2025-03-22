<template>
  <div class="social-wrapper">
    <a href="https://github.com/Volmarg"
       target="_blank"
     >
      <fa :icon="['fab', 'github']"
          class="social-icon"
      />
    </a>

    <a href="https://www.linkedin.com/in/volmarg/"
       target="_blank"
    >
      <fa :icon="['fab', 'linkedin']"
          class="social-icon"
      />
    </a>

    <a href="https://www.xing.com/profile/Dariusz_Wlodarczyk2"
       target="_blank"
    >
      <fa :icon="['fab', 'xing']"
          class="social-icon"
      />
    </a>
  </div>

</template>

<script lang="ts">

export default {
}
</script>

<style lang="scss" scoped>
.social-wrapper {
  @apply flex justify-center
}

.social-icon {
  @apply text-2xl text-white
}
</style>