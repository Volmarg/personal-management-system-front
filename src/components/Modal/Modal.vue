<template>
  <div v-if="isModalVisible || isVshowVisibility"
       v-show="isModalVisible"
  >
    <div class="modal-backdrop"
         :class="getBackdropClasses"
         @click="$emit('modalClosed')"
    ></div>

    <div class="modal show "
         :class="getModalMainWrapperClasses"
         data-background="light"
    >
      <div class="relative w-auto lg:my-4 mx-auto overflow-y-scroll max-h-80-p"
           :class="{
              'w-full lg:max-w-full sm:ml-10 sm:mr-10 ml-3 mr-3'              : isFullSize,
              'sm:w-10/12 lg:w-7/12 sm:max-w-full lg:max-w-full ml-10 mr-10'  : isMediumSize,
              'w-full md:w-6/12 lg:max-w-1/4 ml-10 mr-10'                     : isSmallSize,
              'lg:max-w-lg max-w-sm'                                          : !isFullSize
           }"
      >
        <div class="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
          <span
              class="mt-2 mr-2 font-bold flex justify-end hover:opacity-50 cursor-pointer opacity-70 self-end fixed z-9 text-2xl"
              @click="$emit('modalClosed')"
              v-if="isCloseVisible"
          >
            ✖
          </span>
          <div class="relative flex-auto mt-4"
               :class="{
                  'p-4': hasBodyPadding,
               }"
          >
            <div class="flex items-start justify-start space-x-4"
                 :class="{
                    'p-2': hasBodyPadding,
                 }"
            >
              <div class="flex flex-col w-full">
                <div class="text-lg mb-2 font-bold modal-header-label"
                     :class="{
                        'mt-2': !hasBodyPadding
                     }"
                >{{ title }}</div>
                <div class="text-sm text-gray-500">
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-4 sm:gap-y-0 sm:flex-row items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2"
               :class="{
                  'mt-2': !hasBodyPadding,
                  ...footerClasses
               }"
          >
            <slot name="footerLeftSection"></slot>

            <slot name="cancelButton">
              <MediumButtonWithIcon
                  :text="getCancelButtonText"
                  :margin-right-class-number="cancelButtonMarginRightClassNumber"
                  @click="$emit('modalClosed')"
                  :class="isCloseFullWidth ? 'w-full md:w-auto' : ''"
                  :button-classes="isCloseFullWidth ? 'w-full md:w-auto' : ''"
                  :text-classes="isCloseFullWidth ? 'text-center w-full' : ''"
                  v-if="isCloseVisible"
              />
            </slot>

            <!-- info: not supported by now -->
            <MediumButtonWithIcon
                :text="$t('components.modal.buttons.ok')"
                v-if="isConfirmVisible"
            />

            <slot name="footerRightSection"></slot>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import {shallowRef}        from "vue";
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import CssClassNormalizerMixin from "@/mixins/Attribute/CssClassNormalizerMixin.vue";

export default {
  name: "Modal",
  emits: [
    "modalClosed",
    "modalOpened",
  ],
  data(): ComponentData {
    return {
      config: shallowRef({
        modalFadeAwayTimeInMilliseconds: 300,
      }),
      isModalVisible: false,
      isFadeAway: false,
    }
  },
  props: {
    cancelButtonMarginRightClassNumber: {
      type     : Number,
      required : false,
      default  : 6
    },
    cancelText: {
      type     : [String, null],
      required : false,
      default  : null
    },
    backdropClasses: {
      type     : [String, Object],
      required : false,
      default  : "",
    },
    modalMainWrapperClasses: {
      type     : [String, Object],
      required : false,
      default  : "",
    },
    footerClasses: {
      type     : Object,
      required : false,
      default  : (): Record<string|number, unknown> => {
        return {};
      }
    },
    /**
     * @description modal size
     */
    size: {
      type     : String,
      required : false,
      default  : "small"
    },
    hasBodyPadding: {
      type     : Boolean,
      required : false,
      default  : true,
    },
    isVisible: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    /**
     * @description decides if visibility is controlled via v-show or via v-if:
     *              - true = v-show
     *              - false = v-if
     *
     *              This is sometimes needed, as in some cases it prevents modals from lagging as the data will be always there,
     *              this was added due to issues on mobile, where some dialogs took to long to load,
     */
    isVshowVisibility: {
      type     : Boolean,
      required : false,
      default  : false,
    },
    title: {
      type: String,
      required: true,
    },
    isConfirmVisible: {
      type: Boolean,
      required: false,
      default: false,
    },
    isCloseVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
    isCloseFullWidth: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  mixins: [
    CssClassNormalizerMixin,
  ],
  components: {
    MediumButtonWithIcon
  },
  computed: {
    /**
     * @description returns text to be used on the modal cancel action
     */
    getCancelButtonText(): string {
      if (!StringTypeProcessor.isEmptyString(this.cancelText)) {
        return this.cancelText;
      }

      return this.$t('components.modal.buttons.cancel');
    },
    /**
     * @description returns classes for backdrop
     */
    getBackdropClasses(): Record<string, boolean> {
      return this.mergeCssClasses(
          {
            'fade-in'   : !this.isFadeAway,
            'fade-away' : this.isFadeAway,
          },
          this.backdropClasses
      );
    },
    /**
     * @description returns classes for main modal wrapper (the very top DOM element of modal)
     */
    getModalMainWrapperClasses(): Record<string, boolean> {
      return this.mergeCssClasses(
          {
            'fade-in'   : !this.isFadeAway,
            'fade-away' : this.isFadeAway,
          },
          this.modalMainWrapperClasses
      );
    },
    /**
     * @description will check if modal size is small
     */
    isSmallSize(): boolean {
      return (this.size === "small");
    },
    /**
     * @description will check if modal size is medium
     */
    isMediumSize(): boolean {
      return (this.size === "medium");
    },
    /**
     * @description will check if modal size is full
     */
    isFullSize(): boolean {
      return (this.size === "full");
    }
  },
  methods: {
    /**
     * @description modals can be opened on top of another, so this function checks if there are any modals opened
     *              meaning that it's not a check for just current modal instance but rather for all of them
     */
    areAnyModalsOpened(): boolean {
      return (document.querySelectorAll('.modal.show.fade-in').length > 0);
    },
    /**
     * @description since modals can stack one on top of another, this block will check if there are still any modals open
     *              and if non are open then it will allow scrolling the body back again, else the anti-scroll
     *              class will remain. Timeout is also needed because last modal must first be removed from body
     *              else the check makes no sense.
     */
    handleUnlockBodyScroll(className: string): void {
      setTimeout(() => {
        if (!this.areAnyModalsOpened()) {
          document.body.classList.remove(className);
        }
      }, 10)
    }
  },
  created(): void {
    this.isModalVisible = this.isVisible;
    this.isFadeAway     = !this.isVisible;
  },
  watch: {
    /**
     * @description handles modal fade away animation by setting the data prop responsible for class with animation to true,
     *              and after given time sets the general modal visibility prop.
     *
     *              It has to work like this:
     *              - let the animation be done,
     *              - handle visibility via `v-if`,
     *
     *              Additionally:
     *              - prevents body from being scrolled if the modal is opened
     */
    isVisible(newValue: boolean): void {
      let className = "modal-open";
      if(!newValue){

        this.isFadeAway = true;
        setTimeout( () => {
          this.isModalVisible = false;
          this.handleUnlockBodyScroll(className);
        }, this.config.modalFadeAwayTimeInMilliseconds)
      }else{
        document.body.classList.add(className);

        this.isFadeAway     = false;
        this.isModalVisible = this.isVisible;
        this.$emit('modalOpened');
      }

    }
  }
}
</script>

<style scoped lang="scss">
.fade-away {
  opacity: 0;
  transition: opacity ease-out 400ms;
}

.max-h-80-p {
  max-height: 80%;
}

.modal-backdrop {
  // must be keep in sync of the modal z-index value, as this way it creates nice backdrop on any other modals that are opened behind
  z-index: 20;
}
</style>