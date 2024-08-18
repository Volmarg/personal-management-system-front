<template>
  <div>
    <footer id="footer" class="footer-shap footer-one position-relative blue-bg">
      <div class="container">
        <div class="footer-top">
          <div class="row align-items-center ready-section flex flex-col">
            <div class="col-lg-5 col-sm-12 w-full lg:w-1/5 title-fancy flex-row justify-center">

              <h4 class="footer-title">
                {{ $t('infoPage.footerSection.readyToGetStarted') }}
              </h4>
              <p></p>
            </div>

            <div class="text-center flex justify-center relative">
              <a @click.prevent="goToLoginHandler" class="button align-self-center relative">
                {{ $t('infoPage.footerSection.goHere') }}
              </a>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row">
          <div>
            <div class="logo">
              <a href="#" class="flex justify-center md:justify-start">
                <img
                    src="logo-white.svg"
                    class="mb-3 w-1/2 md:w-2/4 lg:w-1/2"
                >
              </a>
              <div class="copyright mt-1 md:mt-4 text-white text-left flex justify-center md:justify-start">
                Copyright @
                <a href="#" class="text-white">Personal Management System</a>
              </div>
            </div>
          </div>

          <!-- menu elements -->
          <div class="flex flex-col align-self-baseline mt-2 md:mt-0 footer-wrapper justify-center">
            <Menu
                @show-credits-modal="$emit('showCreditsModal')"
                @show-roadmap-modal="$emit('showRoadmapModal')"
            />
          </div>

        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Menu    from "@/views/InfoLandingPage/Components/Footer/Menu.vue";

import ResponsiveVarsMixin   from "@/mixins/Responsive/ResponsiveVarsMixin.vue";
import LoginPageHandlerMixin from "@/views/InfoLandingPage/Components/Mixin/LoginPageHandlerMixin.vue";

export default {
  mixins: [
    ResponsiveVarsMixin,
    LoginPageHandlerMixin,
  ],
  components: {
    Menu,
  },
  emits: [
    "showCreditsModal",
    "showRoadmapModal",
  ]
}
</script>

<style lang="scss">
/* Fixes some issue with some weird element overlapping the menu */
footer.footer-one.footer-shap .container:after {
  height: 0 !important;;
}

.copyright {
  margin-top: 10px !important;
}
</style>

<style lang="scss" scoped>
.footer-wrapper {
  li, h5 {
    margin-left: 5px !important;
  }
}

.ready-section {
  position: relative;
  padding: 30px;
  background: #fff;
  margin-top: -200px;
  box-shadow: 0 0 45px 5px rgba(0,0,0,.04);
  border-radius: 4px;

  &:before {
    content: "";
    position: absolute;
    z-index: 0;
    border-radius: 4px;
    height: 100%;
    background: #fff;
    box-shadow: 0 20px 30px 0 rgba(0,0,0,.06);
    margin: 0 auto;
    left: 0;
    right: 0;
    opacity: .4;
    bottom: -8px;
    width: 98%;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    border-radius: 4px;
    height: 100%;
    background: #fff;
    box-shadow: 0 20px 30px 0 rgba(0,0,0,.06);
    margin: 0 auto;
    left: 0;
    right: 0;
    opacity: .4;
    bottom: -16px;
    width: 96%;
  }
}

#footer:after{
  left: 0;
}
</style>