<template>
  <div class="tabs p-2 mt-4 sm:mt-0 sm:p-12">

    <!-- Some inputs to control the tab selection most likely -->
    <input  v-for="(tabWithContent, index) of tabsWithContent"
            :checked="(0 === index)"
            :key="index"
            :id="getNameForTab(tabWithContent)"
            type="radio"
            name="tab-control"
    >

    <!-- Tabs themself -->
    <ul>
      <li v-for="(tabWithContent, index) of tabsWithContent"
          :key="index"
          class="tab-list-element"
      >
        <label :for="getNameForTab(tabWithContent)"
               role="button"
        >
          <span class="tab-text-with-icon flex flex-row">
            <svg viewBox="0 0 24 24">
              <path
                  d="M14,2A8,8 0 0,0 6,10A8,8 0 0,0 14,18A8,8 0 0,0 22,10H20C20,13.32 17.32,16 14,16A6,6 0 0,1 8,10A6,6 0 0,1 14,4C14.43,4 14.86,4.05 15.27,4.14L16.88,2.54C15.96,2.18 15,2 14,2M20.59,3.58L14,10.17L11.62,7.79L10.21,9.21L14,13L22,5M4.93,5.82C3.08,7.34 2,9.61 2,12A8,8 0 0,0 10,20C10.64,20 11.27,19.92 11.88,19.77C10.12,19.38 8.5,18.5 7.17,17.29C5.22,16.25 4,14.21 4,12C4,11.7 4.03,11.41 4.07,11.11C4.03,10.74 4,10.37 4,10C4,8.56 4.32,7.13 4.93,5.82Z"/>
            </svg>
            <span>{{ getNameForTab(tabWithContent) }}</span>
          </span>
        </label>
      </li>

    </ul>

    <!-- Tabs content -->
    <div class="content">
      <section  v-for="(tabWithContent, index) of tabsWithContent"
                :key="index">
        <h2>{{ getNameForTab(tabWithContent) }}</h2>
        {{ getContentForTab(tabWithContent) }}

        <component v-if="isComponentSet(tabWithContent)"
                   :is="getComponentForTab(tabWithContent)"
                   v-bind="getComponentProps(tabWithContent)"
       />
      </section>
    </div>
  </div>

</template>

<script lang="ts">
import BaseError from "@/scripts/Core/Error/BaseError";

export default {
  name: "Tabs",
  props: {
    /**
     * @description Tabs alongside with their sections content will be built from this property
     *
     * @example supported structure of each tabContent (is additionally validated)
     * [
     *  {
     *    tabName: "",           // name of the tab (string)
     *    tabContent: "",        // content to be shown (string),
     *    tabComponent: null,    // component to be shown (Component|null)
     *    tabComponentProps: {}  // props for `tabComponent` (object)
     *  }
     * ]
     */
    tabsWithContent: {
      type     : Object,
      required : true,
      validator: (value: Array<Record<string, unknown>>): boolean => {

        let tabNames = [];
        for(let singleTabData of value){

          let isTabContentProvided   = ( null !== (singleTabData?.tabContent   ?? null) );
          let isTabComponentProvided = ( null !== (singleTabData?.tabComponent ?? null) );
          let isTabNameProvided      = ( null !== (singleTabData?.tabName      ?? null) );

          if(isTabContentProvided && isTabComponentProvided){
            throw new BaseError("Cannot set both `tabContent` and `tabComponent` for tab!", {
              tabData: singleTabData,
            });
          }

          if(!isTabContentProvided && !isTabComponentProvided){
            throw new BaseError("Neither `tabContent` nor `tabComponent` were set!", {
              tabData: singleTabData,
            });
          }

          if(!isTabNameProvided){
            throw new BaseError("Tab name is missing!", {
              tabData: singleTabData,
            });
          }

          let tabName = singleTabData.tabName as never;
          if( tabNames.includes(tabName) ){
            throw new BaseError("Tab names are not unique. Given name is already present", {
              tabData: singleTabData,
            });
          }

          tabNames.push(tabName)
        }

        return true;
      }
    }
  },
  methods: {
    /**
     * @description will return tab name
     */
    getNameForTab(tabData: Record<string, string>): string {
      return tabData.tabName;
    },
    /**
     * @description will return tab name
     */
    getContentForTab(tabData: Record<string, string>): string {
      return tabData.tabContent;
    },
    /**
     * @description will return tab name
     */
    getComponentForTab(tabData: Record<string, string>): string {
      return tabData.tabComponent;
    },
    /**
     * @description will check if the tab component is set or not
     */
    isComponentSet(tabData: Record<string, string>): boolean {
      return (null !== (tabData?.tabComponent ?? null) );
    },
    /**
     * @description Will return component props used for provided component (if there is any provided)
     */
    getComponentProps(tabData: Record<string, string>): Record<string, unknown> {
      let tabComponentProps = tabData?.tabComponentProps;

      if("object"!== typeof tabComponentProps){
        return {};
      }

      return tabComponentProps;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/responsive.scss';

/**
  - Based on https://codepen.io/woranov/pen/NRqLWK/
  - was adjusted to make it work with more tabs
 */

/* colors */
$blue: #428BFF;
$red: #FF4A53;
$dark: #333;

$accent: $blue;
$accent-inactive: desaturate($accent, 85%);
$secondary: $accent-inactive;

/* tab setting */

/**
  - this needs to stay due to issues with having dynamically added tab count (even with v-bind),
  - it might be breaking responsive design so might need to adjust that later,
  - don't think that there will ever be need of having more than ~7-10 tabs anyway but if so this value should be increased
  - in worst case this tab logic should be totally replaced, it stays at it was just taken from already working example,
    severely adjusted to make it work and look fine, but then the issues with `tab-count` began on the end
 */
$tab-count: 20;
$indicator-width: 50px;
$indicator-height: 4px;

/* selectors relative to radio inputs */
$label-selector: "~ ul > li";
$slider-selector: "~ .slider";
$content-selector: "~ .content > section";

@mixin tabs(
  $label-selector: $label-selector,
  $slider-selector: $slider-selector,
  $content-selector: $content-selector) {

  @for $i from 1 through $tab-count {
    &:nth-of-type(#{$i}):checked {
      #{$label-selector}:nth-child(#{$i}) {
        @content;
      }

      #{$slider-selector} {
        transform: translateX(#{100% * ($i - 1)});
      }

      #{$content-selector}:nth-child(#{$i}) {
        display: block;
      }
    }
  }
}

.tabs {
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  padding-bottom: 80px;
  width: 70%;
  height: 250px;
  min-width: 200px;
  input[name="tab-control"] {
    display: none;
  }

  .content section h2,
  ul li label {
    font-weight: bold;
    font-size: 18px;
    color: $accent;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;

    li {
      box-sizing: border-box;
      width: auto;
      padding: 0 10px;
      text-align: center;

      label {
        transition: all 0.3s ease-in-out;
        color: $secondary;
        padding: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        white-space: nowrap;
        -webkit-touch-callout: none;

        br {
          display: none;
        }

        svg {
          fill: $secondary;
          height: 1.2em;
          vertical-align: bottom;
          margin-right: 0.2em;
          transition: all 0.2s ease-in-out;
        }

        &:hover,
        &:focus,
        &:active {
          outline: 0;
          color: lighten($secondary, 15%);
          svg {
            fill: lighten($secondary, 15%);
          }
        }
      }
    }
  }

  .content {
    margin-top: 10px;

    section {
      display: none;
      animation: {
        name: content;
        direction: normal;
        duration: 0.3s;
        timing-function: ease-in-out;
        iteration-count: 1;
      }
      line-height: 1.4;

      h2 {
        color: $accent;
        display: none;
        &::after {
          content: "";
          position: relative;
          display: block;
          width: 30px;
          height: 3px;
          background: $accent;
          margin-top: 5px;
          left: 1px;
        }
      }
    }
  }

  input[name="tab-control"] {
    @include tabs {
      > label {
        cursor: default;
        color: $accent;

        > .tab-text-with-icon {
          border-bottom: 2px solid $accent;
        }

        svg {
          fill: $accent;
        }

      }
    }
  }

  @keyframes content {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @media all and(max-width: $phoneBreakingPoint + 'px') {
    .tab-list-element {
      width: 100% !important;
    }
  }

  .tab-list-element {
    width: auto;
  }

}
</style>