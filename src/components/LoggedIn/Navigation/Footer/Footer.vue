<template>
  <div class="footer-wrapper animated-footer">

    <footer class="footer">
      <div class="waves">
        <div class="wave" id="wave1"></div>
        <div class="wave" id="wave2"></div>
        <div class="wave" id="wave3"></div>
        <div class="wave" id="wave4"></div>
      </div>

      <LinksMenu />
      <Copyright />
      <AuthorInfo />
    </footer>

  </div>
</template>

<script lang="ts">
import LinksMenu from "@/components/LoggedIn/Navigation/Footer/components/LinksMenu/LinksMenu.vue";
import Copyright from "@/components/LoggedIn/Navigation/Footer/components/Copyright.vue";
import AuthorInfo from "@/components/LoggedIn/Navigation/Footer/components/AuthorInfo.vue";

export default {
  components: {
    AuthorInfo,
    LinksMenu,
    Copyright
  }
}
</script>

<style lang="scss">
.footer-wrapper {
  margin-top: 200px !important;
}

.animated-footer {
  .footer {
    position: relative;
    width: 100%;
    background: #3586ff;
    min-height: 100px;
    padding: 20px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .social-icon,
  .menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    flex-wrap: wrap;
  }

  .social-icon__item,
  .menu__item {
    list-style: none;
  }

  .social-icon__link {
    font-size: 2rem;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
  }
  .social-icon__link:hover {
    transform: translateY(-10px);
  }

  .menu__link {
    font-size: 1.2rem;
    color: #fff;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
    text-decoration: none;
    opacity: 0.75;
    font-weight: 300;
  }

  .menu__link:hover {
    opacity: 1;
  }

  .footer p {
    color: #fff;
    margin: 15px 0 10px 0;
    font-size: 1rem;
    font-weight: 300;
  }

  .wave {
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: url("/src/assets/img/wave.png");
    background-size: 1000px 100px;
  }

  .wave#wave1 {
    z-index: 1;
    opacity: 1;
    bottom: 0;
    animation: animateWaves 4s linear infinite;
  }

  .wave#wave2 {
    z-index: 0;
    opacity: 0.5;
    bottom: 10px;
    animation: animate 4s linear infinite !important;
  }

  .wave#wave3 {
    z-index: 1;
    opacity: 0.2;
    bottom: 15px;
    animation: animateWaves 3s linear infinite;
  }

  .wave#wave4 {
    z-index: 0;
    opacity: 0.7;
    bottom: 20px;
    animation: animate 3s linear infinite;
  }

  @keyframes animateWaves {
    0% {
      background-position-x: 1000px;
    }
    100% {
      background-positon-x: 0px;
    }
  }

  @keyframes animate {
    0% {
      background-position-x: -1000px;
    }
    100% {
      background-positon-x: 0px;
    }
  }
}
</style>