<template>
  <div class="accordion"
       @click="onClick"
       :id="id"
  >
    <ul class="panels-wrapper">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Accordion",
  props: {
    id: {
      type: [null, String],
      required: false,
      default: null,
    }
  },
  emits: [
    'click',
  ],
  methods: {
    /**
     * @description sets the accordion id as hash in url.
     * @todo would be nice to remove the hash when accordion is closed, but that's going to be trickier - not doing now
     */
    onClick(): void {
      if (this.id) {
        this.$router.push({path: this.$route.path, hash: `#${this.id}`})
      }
    }
  }
}
</script>

<style lang="scss">
// based on: https://alvarotrigo.com/blog/css-accordion/
.accordion {
  .transition, .panels-wrapper > li i:before, .panels-wrapper > li i:after, p {
    transition: all 0.5s ease-in-out;
  }

  .flipIn, .panels-wrapper > li, h1 {
    animation: flipdown 0.5s ease both;
  }

  .no-select, h2 {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1, h2 {
    @apply text-blue-500;
  }

  h1 {
    text-transform: uppercase;
  }

  h2 {
    @apply text-blue-500 font-extrabold text-center mb-4 text-lg pt-1 pb-1;
    background-color: white;
    cursor: pointer;
  }

  p {
    color: rgba(48, 69, 92, 0.8);
    position: relative;
    overflow: hidden;
    opacity: 1;
    transform: translate(0, 0);
    margin-top: 14px;
    z-index: 2;
  }

  .panels-wrapper {
    list-style: none;
    perspective: 900;
    padding: 0;
    margin: 0;
  }
  .panels-wrapper > li {
    position: relative;
    padding: 0;
    margin: 0;
  }
  .panels-wrapper > li:nth-of-type(1) {
    animation-delay: 0.5s;
  }
  .panels-wrapper > li:nth-of-type(2) {
    animation-delay: 0.75s;
  }
  .panels-wrapper > li:nth-of-type(3) {
    animation-delay: 1s;
  }
  .panels-wrapper > li:last-of-type {
    padding-bottom: 0;
  }
  .panels-wrapper > li i {
    position: absolute;
    transform: translate(-6px, 0);
    margin-top: 16px;
    right: 0;
  }
  .panels-wrapper > li i:before, .panels-wrapper > li i:after {
    @apply bg-blue-500;
    content: "";
    position: absolute;
    right: 10px;
    width: 3px;
    height: 9px;
  }
  .panels-wrapper > li i:before {
    transform: translate(-2px, 0) rotate(45deg);
  }
  .panels-wrapper > li i:after {
    transform: translate(2px, 0) rotate(-45deg);
  }
  .panels-wrapper > li input[type=checkbox] {
    position: absolute;
    left: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
  .panels-wrapper > li input[type=checkbox]:not(:checked) ~ p {
    margin-top: 0;
    max-height: 0;
    opacity: 0;
    transform: translate(0, 50%);
    & * {
      display: none;
    }
  }
  .panels-wrapper > li input[type=checkbox]:not(:checked) ~ i:before {
    transform: translate(2px, 0) rotate(45deg);
  }
  .panels-wrapper > li input[type=checkbox]:not(:checked) ~ i:after {
    transform: translate(-2px, 0) rotate(-45deg);
  }

  @keyframes flipdown {
    0% {
      opacity: 0;
      transform-origin: top center;
      transform: rotateX(-90deg);
    }
    5% {
      opacity: 1;
    }
    80% {
      transform: rotateX(8deg);
    }
    83% {
      transform: rotateX(6deg);
    }
    92% {
      transform: rotateX(-3deg);
    }
    100% {
      transform-origin: top center;
      transform: rotateX(0deg);
    }
  }
}
</style>