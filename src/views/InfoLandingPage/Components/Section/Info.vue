<template>
  <InfoToLeft
      :header="$t('infoPage.section.info.first.header')"
      :description="$t('infoPage.section.info.first.desc')"
      image-url="/src/assets/img/info-page/section/info/about-us/508.f492d6a.jpeg"
  />

  <InfoToRight
      :header="$t('infoPage.section.info.second.header')"
      :description="$t('infoPage.section.info.second.desc')"
      image-url="/src/assets/img/info-page/section/info/about-us/509.e5ff6e7.jpeg"
  />

</template>

<script lang="ts">
import InfoToLeft from "@/views/InfoLandingPage/Components/Section/Components/Info/InfoToLeft.vue";
import InfoToRight from "@/views/InfoLandingPage/Components/Section/Components/Info/InfoToRight.vue";
export default {
  components: {
    InfoToLeft,
    InfoToRight
  }
}
</script>