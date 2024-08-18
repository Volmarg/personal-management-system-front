<template>
  <div class="menu-wrapper"
       :style="{
          'transform' : `scale(${menuScale})`
       }"
  >
    <nav class="menu"
         v-click-away="hideMenu"
         :style="{
            'transform' : `scale(${menuScale})`
         }"
    >
      <input type="checkbox"
             :class="{
                'menu-open': isMenuOpen,
             }"
             :id="menuId"
             v-model="isMenuOpen"
      />
      <label class="menu-open-button"
             :for="menuId"
             :class="menuButtonClasses"
             v-tippy="{
               content   : tippyContent,
               placement : tippyPlacement
             }"
      >
        <slot name="menu-button-icon"></slot>
      </label>

      <slot name="menu-elements"></slot>
    </nav>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import { v4 as uuidv4 } from 'uuid';

/**
 * Based on:
 * - {@link https://codepen.io/jasperlachance/pen/yOJdRr}
 * - {@link https://freefrontend.com/css-circle-menus/}
 */
export default {
  data(): ComponentData {
    return {
      isMenuOpen : false,
      menuId     : uuidv4(), // needed because there can be more than one menu present, with this each menu works independently
    }
  },
  props: {
    tippyContent: {
      type     : String,
      required : false,
      default  : ""
    },
    tippyPlacement: {
      type     : String,
      required : false,
      default  : ""
    },
    menuButtonClasses: {
      type     : String,
      required : false,
      default  : ""
    },
    /**
     * @description using scaling because it's easier to adjust the size of all components with this,
     *              the menu was taken from some other page and this solution is the best to adjust the size
     */
    menuScale: {
      type     : Number,
      required : false,
      default  : 1
    }
  },
  methods: {
    hideMenu(): void {
      this.isMenuOpen = false;
    }
  }
}
</script>

<style lang="scss">
/*
  All the classes must be added inside this wrapper as the styles cannot be scoped due to menu items being added
 */
.menu-wrapper {

  .menu-item,
  .menu-open-button {
    border-radius: 100%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    position: absolute;
    color: #FFFFFF;
    text-align: center;
    line-height: 80px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform ease-out 200ms;
    transition: -webkit-transform ease-out 200ms;
    transition: transform ease-out 200ms;
    transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
  }

  .menu-open {
    opacity: 0;
    visibility: hidden;
  }

  .menu {
    margin: auto;
    text-align: center;
    box-sizing: border-box;
    font-size: 26px;
  }

  .menu-item:hover {
    @apply bg-blue-200
  }

  .menu-item:nth-child(3) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(4) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(5) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(6) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(7) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(8) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-item:nth-child(9) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
  }

  .menu-open-button {
    z-index: 2;
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    cursor: pointer;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
  }

  .menu-open:checked + .menu-open-button {
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
    transform: scale(0.8, 0.8) translate3d(0, 0, 0);
  }

  .menu-open:checked ~ .menu-item {
    -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
    transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  }

  .menu-open:checked ~ .menu-item:nth-child(3) {
    transition-duration: 180ms;
    -webkit-transition-duration: 180ms;
    -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
    transform: translate3d(0.08361px, -104.99997px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(4) {
    transition-duration: 280ms;
    -webkit-transition-duration: 280ms;
    -webkit-transform: translate3d(90.9466px, -52.47586px, 0);
    transform: translate3d(90.9466px, -52.47586px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(5) {
    transition-duration: 380ms;
    -webkit-transition-duration: 380ms;
    -webkit-transform: translate3d(90.9466px, 52.47586px, 0);
    transform: translate3d(90.9466px, 52.47586px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(6) {
    transition-duration: 480ms;
    -webkit-transition-duration: 480ms;
    -webkit-transform: translate3d(0.08361px, 104.99997px, 0);
    transform: translate3d(0.08361px, 104.99997px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(7) {
    transition-duration: 580ms;
    -webkit-transition-duration: 580ms;
    -webkit-transform: translate3d(-90.86291px, 52.62064px, 0);
    transform: translate3d(-90.86291px, 52.62064px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(8) {
    transition-duration: 680ms;
    -webkit-transition-duration: 680ms;
    -webkit-transform: translate3d(-91.03006px, -52.33095px, 0);
    transform: translate3d(-91.03006px, -52.33095px, 0);
  }

  .menu-open:checked ~ .menu-item:nth-child(9) {
    transition-duration: 780ms;
    -webkit-transition-duration: 780ms;
    -webkit-transform: translate3d(-0.25084px, -104.9997px, 0);
    transform: translate3d(-0.25084px, -104.9997px, 0);
  }

  .blue {
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
    @apply bg-blue-400
  }

  /* Customisations */
  .menu-open-button:hover {
    opacity: 0.75;
  }

}
</style>