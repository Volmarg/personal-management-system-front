<template>
  <div class="tabs p-2 mt-4 sm:mt-0"
       :class="{
          'tabs-no-bg': noBackground,
          'sm:p-12': !noBackground,
          'sm:p-4': noBackground,
       }"
  >

    <!-- Some inputs to control the tab selection most likely -->
    <input  v-for="(tabWithContent, index) of tabsWithContent"
            :checked="(0 === index)"
            :key="index"
            :id="getNameForTab(tabWithContent)"
            type="radio"
            :name="`tab-control${id}`"
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
            <fa icon="bookmark" />
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
                   @single-todo-click="$emit('singleTodoClick', $event)"
                   @close-modal="$emit('closeModal')"
                   @contact-edit-click="$emit('contactEditClick', $event)"
                   @progress-edit-click="$emit('progressEditClick', $event)"
                   @todo-update-confirm-click="$emit('todoUpdateConfirmClick', $event)"
                   @edit-click="$emit('editClick', $event)"
                   @create-click="$emit('createClick', $event)"
                   @remove-click="$emit('removeClick', $event)"
                   @confirm-click="$emit('confirmClick', $event)"
                   @update-confirm-click="$emit('updateConfirmClick', $event)"
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
    noBackground: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * @description this has to be set in case when there are multiple tab panels on same page
     */
    id: {
      type: String,
      required: false,
      default: '',
    },
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
  emits: [
    'contactEditClick',
    'singleTodoClick',
    'closeModal',
    'removeClick',
    'createClick',
    'editClick',
    'confirmClick',
    'progressEditClick',
    'updateConfirmClick',
    'todoUpdateConfirmClick'
  ],
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
  min-width: 200px;
  input[name^="tab-control"] {
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

  input[name^="tab-control"] {
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

  @media all and (max-width: $phoneBreakingPoint + 'px') {
    .tab-list-element {
      width: 100% !important;
    }
  }

  .tab-list-element {
    width: auto;
  }

}
</style>

<style lang="scss">
.tabs-no-bg {
  background: none !important;
}
</style>