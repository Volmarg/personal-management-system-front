<template>
  <div class="block-wrapper">
    <div class="item">
      <div>
        <div class="p-2 border-custom">
          <img
              :src="imagePath"
              class="img-fluid img"
          />
          <div class="text-left">
            <div class="details-box clearfix">
              <div class="consult-details">
                <a href="#">
                  <h5 class="text-hover text ml-2 mt-2">
                    {{ header }}
                  </h5>
                </a>
                <p class="text text-description ml-2 mb-4">
                  {{ description }}
                </p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script class="ts">
export default {
  props: {
    header: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    imagePath: {
      type: String,
      required: false,
      default: "/src/assets/img/info-page/section/info/about-us/512.7302e24.jpeg"
    },
  }
};
</script>

<style lang="scss" scoped>
@import '/src/assets/scss/responsive.scss';

@media screen and (max-width: $tabletBreakingPointPx + 'px') {
  .text {
    text-align: center;
    margin-bottom: 6px;
  }

  .text-description {
    padding-bottom: 10px !important;
  }
}

.border-custom {
  border-radius: 20px;
}
</style>