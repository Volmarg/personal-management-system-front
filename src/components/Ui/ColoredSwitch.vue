<template>
  <div @click="toggleState()">
    <div class="grid grid-rows-2 grid-cols-1 main-grid">

      <div>
        <div class="text-sm">{{ label }}</div>
      </div>
    </div>


    <div>
      <div class="react-switch">
        <div class="react-switch-bg">
          <span
              class="switch-text"
              :class="{
                'justify-end mr-1': !isActive
              }"
          >
            {{ getDescription }}
          </span>
        </div>
        <div :class="{
              'react-switch-handle'      : isActive,
              'react-switch-bg-inactive' : !isActive
            }"
        ></div>
        <input type="checkbox" role="switch" checked="">
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  name: "ColoredSwitch",
  data(): ComponentData {
    return {
      isActive: false,
      config: {
        handleInactiveColor : 'rgb(255, 255, 255)',
        slideInactiveColor  : 'rgb(228, 228, 231)',
      }
    }
  },
  emits: [
    "update:modelValue"
  ],
  props: {
    modelValue: {
      default  : false,
    },
    label: {
      type     : String,
      required : true,
    },
    handleColor: {
      type     : String,
      required : false,
      default  : "rgb(59, 130, 246)",
    },
    slideColor: {
      type     : String,
      required : false,
      default  : "rgb(191, 219, 254)",
    },
  },
  computed : {
    /**
     * @description will return handle color
     */
    getHandleColor(): string {
      return (this.isActive ? this.handleColor : this.config.handleInactiveColor);
    },
    /**
     * @description will return handle color
     */
    getSlideColor(): string {
      return (this.isActive ? this.slideColor : this.config.slideInactiveColor);
    },
    /**
     * @description will return used description
     */
    getDescription(): string {
      return (this.isActive ? this.$t('coloredSwitch.on') : this.$t('coloredSwitch.off'));
    },
  },
  methods: {
    /**
     * @description will toggle the switch state
     */
    toggleState(): void {
      this.isActive = !this.isActive;
      this.$emit("update:modelValue", this.isActive);
    },
  },
  created(): void {
    this.isActive = this.modelValue;
  },
  watch: {
    modelValue() {
      this.isActive = this.modelValue;
    }
  }
}
</script>

<style lang="scss" computed>
.react-switch {
  position: relative;
  display: inline-block;
  text-align: left;
  opacity: 1;
  direction: ltr;
  border-radius: 10px;
  transition: opacity 0.25s ease 0s;
  touch-action: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;

  & input {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    width: 1px;
  }
}

.react-switch-bg {
  height: 20px;
  width: 48px;
  margin: 2px;
  position: relative;
  background: v-bind(getSlideColor);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.25s ease 0s;
}

.react-switch-bg-inactive {
  @extend .react-switch-handle;
  transform: translateX(0px) !important;
}

.react-switch-handle {
  height: 24px;
  width: 24px;
  background: v-bind(getHandleColor);
  display: inline-block;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  transform: translateX(28px);
  top: 0px;
  outline: 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px;
  border: 0px;
  transition: background-color 0.25s ease 0s, transform 0.25s ease 0s, box-shadow 0.15s ease 0s;
}

.main-grid {
  grid-template-rows: 50px 1fr;
}

.switch-text {
  font-size: .775rem;
  @apply ml-1 flex
}

</style>