<template>
  <div class="info-card">
    <section class="pt-0 pb-0">
      <div class="container">
        <div class="row align-items-center flex flex-col"
             :class="{
                ['lg:flex-row']: !reverse,
                ['lg:flex-row-reverse']: reverse,
             }"
        >
          <div class="lg:w-1/2 flex justify-center lg:block w-full pl-2 pr-2">
            <img
                :src="imageUrl"
                class="img-fluid">
          </div>
          <div class="lg:w-1/2 flex flex-col justify-center">
            <div class="title-box text-left mb-0 ml-5 mr-5 md:ml-0 md:mr-0 align-self-center p-10">
              <h3><slot name="header"></slot></h3>
              <p><slot name="description"></slot></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">
.info-card {
  h3 {
    font-size: 30px !important;
  }

  img {
    filter: sepia(100%) hue-rotate(190deg) saturate(900%);
    opacity: 0.9;
  }
}
</style>
