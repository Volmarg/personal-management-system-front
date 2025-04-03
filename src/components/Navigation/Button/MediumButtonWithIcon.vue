<template>
  <div
      class="flex-none medium-button-with-icon-wrapper"
      :class="{
        ...topWrapperClasses,
        'w-full sm:w-auto': isMobileFullWidth,
      }"
  >
    <div v-click-away="onMenuAwayClick">
      <slot name="menu"></slot>
    </div>
    <button class="font-bold text-white px-5 py-3 transition duration-300 ease-in-out flex medium-button-with-icon"
            @click="$emit('buttonClick')"
            :class="{
              'rounded-lg': defaultRounded,
              'flex-col': isIconOnTop,
              [buttonMarginRightClass]: true,
              [buttonClasses]: true,
              'w-full justify-center flex sm:w-auto sm:block': isMobileFullWidth,
              'bg-gray-400 cursor-not-allowed pointer-events-none touch-action-none': disabled,
              'hover:opacity-70': !disabled,
              [backgroundColorClass]: !disabled,
            }"
    >
      <div v-if="isIconOnTop"
           :class="{
              'align-self-center': isIconOnTop,
            }"
      >
        <slot name="icon"></slot>
      </div>

      <slot name="icon"
            v-else
      ></slot>
      <span
          v-if="text !== null"
          class="align-self-center"
          :class="{
            [textClasses]: true,
            'ml-2' : $slots.icon
          }"
      >{{ text }}</span>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "TabButton",
  props: {
    isMobileFullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    backgroundColorClass: {
      type     : String,
      required : false,
      default  : 'bg-blue-500',
    },
    text: {
      type     : [String, null],
      required : false,
      default  : null
    },
    isIconOnTop: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    marginRightClassNumber: {
      type     : Number,
      required : false,
      default  : 6
    },
    buttonClasses : {
      type     : String,
      required : false,
      default  : ""
    },
    topWrapperClasses : {
      type     : String, Object,
      required : false,
      default  : ""
    },
    textClasses : {
      type     : String,
      required : false,
      default  : ""
    },
    defaultRounded: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: [
    'buttonClick', // since click will be coming from top wrapper element (which is not button element)
    'menuClose',
  ],
  computed: {
    /**
     * @description returns the margin right class used on the button itself
     */
    buttonMarginRightClass(): string {
      return `mr-${this.marginRightClassNumber}`;
    }
  },
  methods: {
    /**
     * @description check if given element is the button itself
     */
    isButtonItself(domElement: HTMLElement | null): boolean {
      /**
       * @description this weird thing was added due to contacts page select throwing error "cannot access classList" on null,
       *              guessing that this can happen when dom element is for some reason gone from tree. Already tried
       *              catching the null check in the {@see onMenuAwayClick}, but there the node is present while in current
       *              scope it's already null.
       */
      if (null === domElement) {
        return false;
      }

      return domElement.classList.contains('medium-button-with-icon');
    },
    /**
     * @description when user clicks away from opened menu then hide it, but prevent
     *              hiding when user clicks on any element that is a part of the button
     */
    onMenuAwayClick(event: PointerEvent): void {
      let domElement = event.target as HTMLElement | null;

      if (this.isButtonItself(domElement)) {
        return
      }

      if ("span" === domElement.nodeName.toLowerCase() && this.isButtonItself(domElement.parentElement)) {
        return
      }

      if ("svg" === domElement.nodeName.toLowerCase() && this.isButtonItself(domElement.parentElement.parentElement)) {
        return
      }

      if ("path" === domElement.nodeName.toLowerCase() && this.isButtonItself(domElement.parentElement.parentElement.parentElement)) {
        return
      }

      this.$emit('menuClose');
    },
  }
}
</script>

