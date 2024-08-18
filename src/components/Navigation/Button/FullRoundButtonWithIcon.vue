<template>
<div class="full-round-button">
  <div class="button opacity-100 hover:opacity-90 duration-300 transition transition-all"
       :class="{
          'slide-able'               : slideAble,
          [backgroundColorClassName] : true,
       }"
  >
    <div class="text-white text-3xl icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <header class="text-white">{{ label }}</header>
  </div>
</div>
</template>

<script lang="ts">
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  name: "FullRoundedButtonWithIcon",
  props: {
    label: {
      type     : String,
      required : false,
      default  : "",
    },
    buttonSize: {
      type     : String,
      required : false,
      default  : '50px',
    },
    slideAble: {
      type     : Boolean,
      required : false,
      default  : true,
    },
    backgroundColorClassName: {
      type     : String,
      required : false,
      default  : 'bg-blue-500'
    }
  },
  computed: {
    /**
     * @description will calculate max css button width depending on length of label button
     */
    calculateMaxWidthForLabel(): string {
      if(!this.isLabelSet){
        return "0";
      }

      let baseMultiplier = 12;
      let stringLength   = this.label.length;

      return (baseMultiplier * stringLength).toString() + "px";
    },
    /**
     * @description will check if label has been set
     */
    isLabelSet(): boolean {
      return !StringTypeProcessor.isEmptyString(this.label);
    }
  }
}
</script>

<style lang="scss" scoped>

.button {
  width: v-bind(buttonSize);
  height: v-bind(buttonSize);
  display: flex;
  justify-content: center;

  align-items: center;
  overflow: hidden;
  transition: 0.4s;
  padding: 0 5px;
  border-radius: 99px;
  cursor: pointer;
}

.icon-wrapper {
  align-self: center;
  font-size: 1.5rem;
}

h1 {
  font-size: 14px;
  margin-left: 10px;
}

header {
  display: none;
  white-space: nowrap;
  padding-left: 15px;
}

.slide-able:hover {
  justify-content: flex-start;

  width: v-bind(calculateMaxWidthForLabel);
  transition: 0.4s;
  border-radius: 35px;

  .icon-wrapper {
    margin-left: 10px;
  }

}

.slide-able:hover header {
  display: block;
}
</style>

<style lang="scss">
// this is because of fontawesome being out of scope
.full-round-button {
  svg {
    margin: 0 !important;
  }
}
</style>