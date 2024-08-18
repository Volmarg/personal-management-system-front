<template>
  <section class="pt-0 pb-0">
    <div class="container">
      <div class="row align-items-center">
        <div class="lg:w-1/2 flex justify-center lg:block w-full pl-2 pr-2">
          <img
              :src="imageUrl"
              class="img-fluid">
        </div>
        <div class="lg:w-1/2">
          <div class="title-box text-left mb-0 ml-5 mr-5 md:ml-0 md:mr-0"><h2>
            {{ header }}
          </h2>
            <p v-html="description">
            </p></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    }
  }
}
</script>
