<template>
  <div>
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1 class="code">404</h1>
        </div>
        <h2>{{ $t('404.message') }}</h2>
        <br/>
        <a @click.prevent="goBack">
          <span class="arrow"></span>
          <span class="go-back-text">
            {{ $t('404.button') }}
          </span>
        </a>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import VueRouter from "@/router/VueRouter";

export default {
  computed: {
    /**
     * @description returns the go-back page. Turns out that there is an issue both with vue router and browser history,
     *              as it will always point to the home page route, which is incorrect, thus not supporting the
     *              proper go-back for now.
     *
     *              Info: could add some cookie or window value in future to track this.
     */
    backUrl(): string {
      return VueRouter.ROUTE_PATH_HOME;
    },
  },
  methods: {
    /**
     * @description goes back to the previous page or to home page if the from-page is not defined for some reason
     */
    goBack(): void {
      this.$router.push(this.backUrl);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/fonts/fredoka.scss';
@import '@/assets/scss/fonts/raleway.scss';
@import '@/assets/scss/responsive.scss';

.code, .go-back-text {
  @apply text-blue-500;
}

.arrow {
  @apply border-blue-500;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 710px;
  width: 100%;
  text-align: center;
  padding: 0px 15px;
  line-height: 1.4;
}

.notfound .notfound-404 {
  height: 200px;
  line-height: 200px;
}

.notfound .notfound-404 h1 {
  font-family: 'Fredoka One', cursive;
  font-size: 168px;
  margin: 0px;
  color: #ff508e;
  text-transform: uppercase;
}

.notfound h2 {
  font-family: 'Raleway', sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
  color: #222;
  margin: 0;
}

.notfound-search {
  position: relative;
  padding-right: 123px;
  max-width: 420px;
  width: 100%;
  margin: 30px auto 22px;
}

.notfound-search input {
  font-family: 'Raleway', sans-serif;
  width: 100%;
  height: 40px;
  padding: 3px 15px;
  color: #222;
  font-size: 18px;
  background: #f8fafb;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 3px;
}

.notfound-search button {
  font-family: 'Raleway', sans-serif;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 120px;
  height: 40px;
  text-align: center;
  border: none;
  background: #ff508e;
  cursor: pointer;
  padding: 0;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  border-radius: 3px;
}

.notfound a {
  font-family: 'Raleway', sans-serif;
  display: inline-block;
  font-weight: 700;
  border-radius: 15px;
  text-decoration: none;
  color: #39b1cb;
}

.notfound a>.arrow {
  position: relative;
  top: -2px;
  border: solid #39b1cb;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  -webkit-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  transform: rotate(135deg);
}

@media only screen and (max-width: $tabletBreakingPointPx + 'px') {
  .notfound .notfound-404 {
    height: 122px;
    line-height: 122px;
  }
  .notfound .notfound-404 h1 {
    font-size: 122px;
  }
}

</style>