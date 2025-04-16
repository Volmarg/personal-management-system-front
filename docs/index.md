---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Personal Management System"
  text: "“Stay organized”"
  tagline: |
    Personal Management System (<b>PMS</b>) is a web-app tool designed to organize the essentials of everyday life, everything from a simple to-do list, and notes up to payments, and schedules. No more thinking about unhandled pending issues, no more sticky notes on the desk, or tones of files randomly tossed between folders.
    <p/>
    <i>Simplicity, transparency, flexibility and expandability - designed for personal use.</i>
  actions:
    - theme: brand
      text: Documentation
      link: /docs/base-information/repositories

---

<script setup>
import Carousel from './components/index/Carousel.vue';
import InfoCard from './components/index/InfoCard.vue';
</script>

<Carousel />

<hr />

<InfoCard image-url="./assets/index/questions.png">
    <template #header>
        Easy to Use
    </template>
    <template #description>
        Intuitive and user-friendly. PMS has been designed to be clear and handy so that everything is organized and divided into the proper categories and subsections.
    </template>
</InfoCard>

<InfoCard :reverse="true" image-url="./assets/index/sitting.png">
    <template #header>
        Freedom of mind
    </template>
    <template #description>
        Intuitive and user-friendly. PMS has been designed to be clear and handy so that everything is organized and divided into the proper categories and subsections.
    </template>
</InfoCard>
