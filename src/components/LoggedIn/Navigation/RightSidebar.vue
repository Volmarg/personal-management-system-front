<template>
  <div class="right-sidebar right-sidebar-1"
      :class="{
        'open': isVisible
      }"
       :style="{
        'z-index': sidebarZIndex
       }"
       v-click-away="hideSidebar"
  >
    <div ref="firstChild">
      <div>

        <!-- top options -->
        <div class="flex flex-col">
          <div class="px-4 h-16 flex flex-row-reverse items-center justify-between text-white">
            <span class="text-4xl opacity-100 transition transition-opacity hover:opacity-75 duration-300 cursor-pointer text-gray-500"
                  @click="hideSidebar()"
            >
              <fa icon="times"/>
            </span>
          </div>
        </div>

        <!-- Content in form of component -->
        <component  v-if="isComponentOrItsNameProvided && isVisible"
                    v-bind="getSidebarComponentProperties"
                    :is="getSidebarComponentOrItsName"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import BaseError       from "@/scripts/Core/Error/BaseError";
import {Component}     from "vue";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  name: "RightSidebar",
  data(): ComponentData {
    return {
      isVisible       : false,
      isAllowedToHide : false,
      widthPercentage : null,
      config: {
        sidebar: {
          defaultWidthPercent: "60%",
        }
      }
    }
  },
  props: {
    /**
     * @description this is expected as the content (but vue does not allow using TS types as props types)
     * @see RightSidebarComponentData
     */
    contentData: {
      required : true,
      validator: (value: Record<string, unknown>): boolean => {
        let isNameProvided     = (null !== (value?.componentName     ?? null));
        let isInstanceProvided = (null !== (value?.componentInstance ?? null));

        /**
         * @description It's allowed that no component data is provided, so `component` won't be rendered
         */
        if(!isNameProvided && !isInstanceProvided){
          return true;
        }

        if(isNameProvided && isInstanceProvided){
          throw new BaseError("Both `componentName` and `componentInstance` cannot be set at the same time for `contentData` of `RightSidebar`. Chose only one!")
        }

        return true;
      }
    },
    sidebarWidthPercent: {
      type     : String,
      required : false,
    },
    sidebarZIndex: {
      type     : Number,
      required : false,
      default  : 20,
    }
  },
  emit: [
    'sidebarHidden',
  ],
  computed: {
    /**
     * @description will check if the content data of sidebar has any of the `component` property set
     */
    isComponentOrItsNameProvided(): boolean {
      let isNameProvided     = (null !== (this.contentData?.componentName     ?? null));
      let isInstanceProvided = (null !== (this.contentData?.componentInstance ?? null));

      return (isNameProvided || isInstanceProvided);
    },
    /**
     * @description gets the component which should be shown as the sidebar content
     */
    getSidebarComponentOrItsName(): Component | string {
      let isNameProvided = (null !== (this.contentData?.componentName ?? null));

      if(isNameProvided){
        return this.contentData.componentName;
      }

      return this.contentData.componentInstance;
    },
    /**
     * @description will return eventual properties provided alongside with the component name
     *              returned object serves as `all-in-one` properties for component, so should
     *              always contain of all necessary properties
     */
    getSidebarComponentProperties(): Record<string, unknown> {
      let arePropsForComponentProvided = (null !== (this.contentData?.componentPropsData ?? null))
      if(arePropsForComponentProvided){
        return this.contentData.componentPropsData;
      }

      return {};
    }
  },
  methods: {
    /**
     * @description will show sidebar
     */
    showSidebar(): void {
      this.isVisible = true;
    },
    /**
     * @description will hide sidebar
     */
    hideSidebar(): void {
      if(this.isVisible){ // must be checked else prevent from even opening the sidebar

        if(this.isAllowedToHide){
          this.isVisible       = false;
          this.isAllowedToHide = false; // reset
          this.$emit('sidebarHidden');
          return;
        }
      }
      this.isAllowedToHide = true;
    }
  },
  watch: {
    /**
     * @description keep an eye on the sidebar width prop,
     *              if no width is provided then use the default one
     *              - not putting this on the prop as default to avoid redundant percentage definition
     */
    sidebarWidthPercent(newValue: null | string | undefined){
      this.widthPercentage = newValue;
      if (StringTypeProcessor.isEmptyString(newValue)) {
        this.widthPercentage = this.config.sidebar.defaultWidthPercent;
      }
    },
    /**
     * @description prevents body from being scrolled if the sidebar is opened
     */
    isVisible(isVisible: boolean): void {
      let className = "right-sidebar-open";
      if (isVisible) {
        document.body.classList.add(className);
        return;
      }

      document.body.classList.remove(className);
    }
  }
}
</script>

<style lang="scss">

.right-sidebar.open {
  width: v-bind(widthPercentage);

  & div {
    width:  100%;

    & div {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .right-sidebar.open {
    width: 100%;
  }
}
</style>