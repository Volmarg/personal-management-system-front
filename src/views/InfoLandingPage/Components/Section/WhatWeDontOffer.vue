<template>
  <OfferSection
      :offer-description="$t('infoPage.section.whatWeDoNotOffer.desc')"
      :offer-header="$t('infoPage.section.whatWeDoNotOffer.header')"
  >

    <template #sliderContent>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeDoNotOffer.slider.1.desc')"
                          :header="$t('infoPage.section.whatWeDoNotOffer.slider.1.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-dont-offer/direct-contact.jpg"
        />
      </SplideSlide>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeDoNotOffer.slider.2.desc')"
                          :header="$t('infoPage.section.whatWeDoNotOffer.slider.2.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-dont-offer/aggregation.jpg"
        />
      </SplideSlide>
      <SplideSlide>
        <WhatWeOfferBlock :description="$t('infoPage.section.whatWeDoNotOffer.slider.3.desc')"
                          :header="$t('infoPage.section.whatWeDoNotOffer.slider.3.header')"
                          image-path="/src/assets/img/info-page/section/info/what-we-dont-offer/24-7.jpg"
        />
      </SplideSlide>
    </template>

  </OfferSection>
</template>

<script lang="ts">
import { SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css/skyblue';

import OfferSection     from "@/views/InfoLandingPage/Components/Section/Components/Offer/Section.vue";
import WhatWeOfferBlock from "@/views/InfoLandingPage/Components/Section/Components/Offer/Block.vue";

export default {
  components: {
    OfferSection,
    WhatWeOfferBlock,
    SplideSlide,
  },
}
</script>