<template>
  <div v-if="isModalVisible || isVshowVisibility"
       v-show="isModalVisible"
       @keydown.esc="$emit('modalClosed')"
       tabindex="0"
  >
    <div class="modal-backdrop"
         :class="getBackdropClasses"
         @click="$emit('modalClosed')"
    ></div>

    <div class="modal show "
         :id="id"
         :class="getModalMainWrapperClasses"
         data-background="light"
    >
      <div class="relative w-auto lg:my-4 mx-auto overflow-y-scroll max-h-size"
           :class="{
              'w-full lg:max-w-full sm:ml-10 sm:mr-10 ml-3 mr-3'              : isFullSize,
              'sm:w-10/12 lg:w-7/12 sm:max-w-full lg:max-w-full ml-10 mr-10'  : isMediumSize,
              'w-full md:w-6/12 lg:max-w-1/4 ml-10 mr-10'                     : isSmallSize,
              'lg:max-w-lg max-w-sm'                                          : !isFullSize
           }"
      >
        <div class="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
          <span
              class="mt-2 mr-2 font-bold flex flex-col justify-end hover:opacity-50 cursor-pointer opacity-70 self-end fixed z-9"
              @click="$emit('modalClosed')"
              v-if="isCloseVisible"
          >
            <span class="text-2xl">✖</span>
            <small class="-mt-3 -ml-1">(Esc)</small>
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
                <slot name="aboveTitle"></slot>
                <div class="text-lg mb-2 font-bold modal-header-label text-center"
                     :class="{
                        'mt-2': !hasBodyPadding
                     }"
                >{{ title }}</div>
                <div class="text-sm text-gray-500">
                  <input type="checkbox" class="modal-focuser"/>
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-2 sm:flex-row items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2 flex-wrap"
               :class="{
                  'mt-2': !hasBodyPadding,
                  ...footerClasses
               }"
          >
            <slot name="footerLeftSection"></slot>

            <slot name="cancelButton">
              <MediumButtonWithIcon
                  :text="getCancelButtonText"
                  :is-mobile-full-width="true"
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
      modalOpenClass: "modal-open",
      config: shallowRef({
        modalFadeAwayTimeInMilliseconds: 300,
      }),
      isModalVisible: false,
      isFadeAway: false,
    }
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
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
    },
    /**
     * @description focuses the top opened modal, that's needed for closing with ESC to work
     *              might not work perfectly. The timeout is added as a quick fix for issue
     *              with focusing not-yet existing element. If this will fail, then next attempt
     *              should be mutation observer.
     */
    focusTopModal(timeout: number = 200): void {
      setTimeout(() => {
        let allInputs = document.querySelectorAll('.modal-focuser');
        if (allInputs.length === 0) {
          return;
        }

        let lastInput = allInputs[allInputs.length - 1];
        lastInput.focus();
      }, timeout);
    },
    /**
     * @description upon closing modal:
     *              - update the data prop that tracks modal visibility,
     *              - unlock the earlier blocked body scrolling,
     *              - set focus on any remaining top modal that is still open,
     */
    handleModalClose(): void {
      setTimeout( () => {
        this.isModalVisible = false;
        this.handleUnlockBodyScroll(this.modalOpenClass);
        this.focusTopModal(0);
      }, this.config.modalFadeAwayTimeInMilliseconds)
    }
  },
  created(): void {
    this.isModalVisible = this.isVisible;
    this.isFadeAway     = !this.isVisible;
  },
  unmounted(): void {
    /**
     * @description this call must be here, earlier it was in watcher but sometimes the body-scroll-lock was not
     *              getting unlocked, the guessing here was that probably the code was sometimes not executed properly because
     *              unmount came in, and watcher was getting interrupted since component was already destroyed,
     */
    this.handleModalClose();
  },
  watch: {
    isModalVisible(): void {
      if (this.isModalVisible) {
        this.focusTopModal();
      }
    },
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
      if(!newValue){

        this.isFadeAway = true;
        this.handleModalClose();
      }else{
        document.body.classList.add(this.modalOpenClass);

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

.max-h-size {
  max-height: 90%;
}

.modal-backdrop {
  // must be keep in sync of the modal z-index value, as this way it creates nice backdrop on any other modals that are opened behind
  z-index: 20;
}

.modal-focuser {
  height: 0 !important;
  @apply m-0 p-0 w-0 opacity-0 absolute pointer-events-none
}
</style>