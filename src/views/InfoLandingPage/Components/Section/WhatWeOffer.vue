<template>
  <OfferSection
      :offer-description="$t('infoPage.section.whatWeOffer.desc')"
      :offer-header="$t('infoPage.section.whatWeOffer.header')"
      id="offer"
  >

    <template #sliderContent>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeOffer.slider.1.desc')"
                          :header="$t('infoPage.section.whatWeOffer.slider.1.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-offer/offer-search.jpg"
        />
      </SplideSlide>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeOffer.slider.2.desc')"
                          :header="$t('infoPage.section.whatWeOffer.slider.2.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-offer/email-builder.jpg"
        />
      </SplideSlide>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeOffer.slider.3.desc')"
                          :header="$t('infoPage.section.whatWeOffer.slider.3.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-offer/bulk-applications.jpg"
        />
      </SplideSlide>
    </template>

  </OfferSection>
</template>

<script lang="ts">
import {SplideSlide} from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css/skyblue';

import WhatWeOfferBlock from "@/views/InfoLandingPage/Components/Section/Components/Offer/Block.vue";
import OfferSection     from "@/views/InfoLandingPage/Components/Section/Components/Offer/Section.vue";

export default {
  components: {
    OfferSection,
    WhatWeOfferBlock,
    SplideSlide,
  },
}
</script>