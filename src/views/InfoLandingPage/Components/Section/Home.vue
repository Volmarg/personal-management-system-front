<template>
  <div id="home-section">
    <div class="mb-0 mt-0">
      <div class="bg-transparent p-0 m-auto visible w-full left-0 div-ii">
        <div class="revslider-initialised rev_redraw_on_blurfocus mb-0 w-full mt-0 div-hh">
          <div class="visible block h-full w-full overflow-hidden">
            <div id="div-a"
                 class="active-div overflow-hidden h-full w-full opacity-100">
              <div class="block visible z-10 div-d">
                <div class="block">
                  <div class="block visible overflow-hidden div-f">
                    <div class="now-font div header-description-line-one">
                      {{ $t('infoPage.section.home.headerUpper') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="block z-9 pointer-events-auto visible div-g">
                <div class="block">
                  <div class="block visible overflow-hidden div-h">
                    <div class="now-font div company-name-text">
                      {{ $t('infoPage.section.home.headerLower') }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="block z-8 visible div-i">
                <div class="block">
                  <div class="block visible overflow-hidden div-j">
                    <div class="div break-words description-sections">
                      {{ $t('infoPage.section.home.description') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ExternalStyles />
</template>

<script lang="ts">
import ExternalStyles from "@/views/InfoLandingPage/Components/Section/Components/Home/ExternalStyles.vue";

export default {
  components: {
    ExternalStyles
  }
}
</script>
