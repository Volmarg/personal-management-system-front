<template>
  <div
      class="flex-none"
      :class="{
        ...topWrapperClasses,
        'w-full sm:w-auto': isMobileFullWidth,
      }"
  >
    <button class="font-bold text-white px-5 py-3 transition duration-300 ease-in-out flex"
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
    'buttonClick' // since click will be coming from top wrapper element (which is not button element)
  ],
  computed: {
    /**
     * @description returns the margin right class used on the button itself
     */
    buttonMarginRightClass(): string {
      return `mr-${this.marginRightClassNumber}`;
    }
  }
}
</script>

