<script lang="ts">
import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import {ISchedule}     from "tui-calendar";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import UtilsMixin from "@/views/Modules/Calendar/Schedules/Mixin/UtilsMixin.vue";

import TuiDatePicker from 'tui-date-picker'
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";

/**
 * @description most of this code is a pure madness extracted from PMS legacy,
 *              adjusted to make it just work for vue implementation
 */
export default {
  data(): ComponentData {
    return {
      isUpdatePopup: false,
      lastUsedReminderId: 0,
    }
  },
  mixins: [
    UtilsMixin,
  ],
  methods: {
    /**
     * @description modifies the original popup, adds reminder / body handling
     */
    modifyDetailPopup(): void {
      let parentWrapperObserver = new MutationObserver((mutations) => {

        for (let mutation of mutations) {
          if (0 == mutation.target.childNodes.length) {
            // inactive popup - don't do anything
            return;
          }
        }

        // add/prefill fields
        let lastClickedSchedule = this.findSchedule(this.lastClickedScheduleId);
        let valueForBodyField   = "";

        // check if popup is opened in state of UPDATE or CREATE
        let scheduleTitle  = document.querySelector('.tui-full-calendar-section-title input')?.getAttribute('value') ?? '' as string;
        this.isUpdatePopup = !StringTypeProcessor.isEmptyString(scheduleTitle);

        // this is null when creating new schedule via popup
        if (null != lastClickedSchedule) {
          valueForBodyField = lastClickedSchedule['body'];
        }

        // BODY
        let bodySection = this.buildInputFieldForPopup(
            'body',
            valueForBodyField,
            "",
            "",
            false,
            false,
            false,
            "",
            "",
            lastClickedSchedule
        );

        document.querySelector('.tui-full-calendar-section-title')?.parentElement.appendChild(bodySection);

        // Reminders handling
        // add inputs for all reminders dates
        let parent = document.querySelector(".tui-full-calendar-section-location")?.parentElement;
        let remindersWrapper = document.createElement("DIV");
        remindersWrapper.classList.add('reminders-wrapper');
        if (parent) {
          parent.append(remindersWrapper);
        }

        if (null !== lastClickedSchedule && !StringTypeProcessor.isEmptyString(lastClickedSchedule.recurrenceRule)) {
          let arrayOfRemindersDates = lastClickedSchedule.recurrenceRule.split(",");

          for (let counter = 0; counter <= (arrayOfRemindersDates.length - 1); counter++) {
            let date = new Date(arrayOfRemindersDates[counter]);
            if (counter === 0) {
              this.buildReminderRow(lastClickedSchedule, true, false, date);
              continue;
            }

            this.buildReminderRow(lastClickedSchedule, true, true, date);
          }

        } else {
          // add new base input reminder
          this.buildReminderRow(lastClickedSchedule, true);
        }
      })

      // each view has it's own popover - the active one has child nodes
      let allPopoverWrappers = document.querySelectorAll('.tui-full-calendar-floating-layer');
      for(let wrapper of allPopoverWrappers){
        parentWrapperObserver.observe(wrapper, {
          childList: true,
        })
      }
    },
    /**
     * @description returns the reminders dates in form of a string
     */
    remindersDatesAsString(reminders: Array<string>): string {
      if (ArrayTypeProcessor.isEmpty(reminders)) {
        return "";
      }

      return Object.values(reminders).join(", ");
    },
    /**
     * @description builds single input field
     */
    buildInputFieldForPopup(
        fieldName               : string,
        dataToPrefill          ?: any,
        inputClasses           ?: string,
        additionalWrapperId    ?: string,
        allowClone              : boolean   = false,
        allowRemove             : boolean   = false,
        allowClear              : boolean   = false,
        popupSectionClasses     : string    = "",
        innerDivWrapperClasses  : string    = "",
        lastClickedSchedule     : ISchedule = null
    ): HTMLElement {
      let divPopupSection     = document.createElement("DIV");
      let divPopupSectionItem = document.createElement("DIV");
      let input               = document.createElement("INPUT");
      let additionalWrapper   = document.createElement("DIV");

      if (!StringTypeProcessor.isEmptyString(additionalWrapperId)) {
        additionalWrapper.setAttribute("id", additionalWrapperId);
      }

      divPopupSection.classList.add('tui-full-calendar-popup-section');
      for (let popupSectionClass of popupSectionClasses?.split(" ") ?? []) {
        if (!StringTypeProcessor.isEmptyString(popupSectionClass)) {
          divPopupSection.classList.add(popupSectionClass);
        }
      }

      divPopupSectionItem.classList.add(`tui-full-calendar-popup-section-item`);
      divPopupSectionItem.classList.add(`tui-full-calendar-section-${fieldName}`);
      for (let innerDivWrapperClass of innerDivWrapperClasses?.split(" ") ?? []) {
        if (!StringTypeProcessor.isEmptyString(innerDivWrapperClass)) {
          divPopupSection.classList.add(innerDivWrapperClass);
        }
      }

      // turns out that this class is there on purpose else the input content breaks
      input.classList.add('tui-full-calendar-content');
      for (let inputClass of inputClasses?.split(" ") ?? []) {
        if (!StringTypeProcessor.isEmptyString(inputClass)) {
          input.classList.add(inputClass);
        }
      }


      input.setAttribute('id', fieldName);
      input.setAttribute('placeholder', StringTypeProcessor.ucFirst(fieldName))
      input.setAttribute("autocomplete", "off");

      if (this.isUpdatePopup && null !== dataToPrefill) {
        input.value = dataToPrefill;
      }

      // combine all
      divPopupSectionItem.append(input);
      divPopupSection.append(divPopupSectionItem);
      divPopupSection.append(additionalWrapper);

      if (allowClone || allowRemove || allowClear) {
        let actionsWrapper = document.createElement("SECTION");
        actionsWrapper.classList.add("actions-wrapper")

        if (allowClone) {
          let addButtonCallback = () => {
            this.buildReminderRow(lastClickedSchedule, true, true);
          };
          actionsWrapper = this.addSingleActionButtonForPopup(actionsWrapper, "reminder-icon fa-plus-circle", addButtonCallback, "text-success");
        }

        if (allowRemove) {
          let removeButtonCallback = () => divPopupSectionItem.parentElement.remove();
          actionsWrapper = this.addSingleActionButtonForPopup(actionsWrapper, "reminder-icon fa-trash", removeButtonCallback, "text-danger");
        }

        let clearButtonCallback = () => input.value = "";
        actionsWrapper = this.addSingleActionButtonForPopup(actionsWrapper, "reminder-icon fa-times-circle", clearButtonCallback, "text-dark-orange");

        divPopupSection.append(actionsWrapper);
      }

      return divPopupSection;
    },
    /**
     * @description adds button inside a popup
     */
    addSingleActionButtonForPopup(actionsWrapper: HTMLElement, iconName: string, clickCallback): HTMLElement {
      let icon = document.createElement("I");

      for (let iconPart of iconName.split(" ")) {
        if (!StringTypeProcessor.isEmptyString(iconPart)) {
          icon.classList.add(iconPart)
        }
      }

      let button = document.createElement("SPAN"); // that's correct, it's a button in terms of logic but using span to show fontawesome icon
      for (let buttonClass of iconName.split(" ")) {
        if (!StringTypeProcessor.isEmptyString(buttonClass)) {
          icon.classList.add(buttonClass)
        }
      }

      button.classList.add("popup-action-button");

      button.addEventListener('click', (event) => {
        event.preventDefault();
        clickCallback(event);
      })

      button.append(icon);
      actionsWrapper.append(button);

      return actionsWrapper;
    },
    /**
     * @description create reminder row
     */
    buildReminderRow(lastClickedSchedule: ISchedule, allowClone: boolean = false, allowRemove: boolean = false, date: Date | null = null): void {
      this.lastUsedReminderId++;
      let reminderIdentifier = "reminder-calendar" + this.lastUsedReminderId;
      let addedClasses       = `reminder-calendar ${reminderIdentifier}`;

      let reminderSection = this.buildInputFieldForPopup(
          'reminder',
          "",
          addedClasses,
          reminderIdentifier,
          allowClone,
          allowRemove,
          true,
          "d-flex reminder-section-wrapper",
          "col-6",
          lastClickedSchedule
      );
      document.querySelector(".reminders-wrapper")?.prepend(reminderSection);
      let usedDate = null; // on purpose to keep the field empty so that it's known that no reminder is set
      if (this.isUpdatePopup && date instanceof Date) {
        usedDate = date;
      }

      // apply date picker
      let selector = `#${reminderIdentifier}`;
      if (document.querySelector(selector)) {
        new TuiDatePicker(selector, {
          date: usedDate,
          input: {
            element: `.${reminderIdentifier}`,
            format: 'yyyy-MM-dd hh:mm'
          },
          timePicker: true
        });
      }

    },
  }
}
</script>

<style lang="scss">
#tui-full-calendar-schedule-private,
.tui-full-calendar-section-allday,
.tui-full-calendar-section-state
{
  display: none !important;
}

.tui-full-calendar-section-body {
  @apply mt-2 mb-2
}

.tui-full-calendar-section-title,
.tui-full-calendar-section-body,
.tui-full-calendar-section-reminder
{
  width: 100% !important;
}

.tui-full-calendar-section-body,
.tui-full-calendar-section-reminder {
  input {
    width: 100% !important;
  }
}

.reminder-section-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.tui-full-calendar-section-start-date {
  @apply mt-2
}

.tui-full-calendar-popup-save {
  background-color: rgb(59, 130, 246) !important;

  &:hover {
    opacity: 0.75;
  }

  @apply mt-2
}

.tui-full-calendar-dropdown-menu {
  li {
    @apply text-left
  }
}

.popup-action-button {
  width: 80px;
  height: 30px;
  display: inline-block;
  border-radius: 15px;
  background-color: rgb(59, 130, 246);

  &:hover {
    @apply opacity-70 cursor-pointer
  }

  @apply ml-2
}

.reminder-icon {
  &::before {
    display: flex;
    justify-content: center;
    color: white;
    font-size: 13px;
    font-style: normal;
    margin-top: 4px;
  }
}

// v-bind is not working here so hardcoding string
.fa-plus-circle::before {
  content: "Add";
}

// v-bind is not working here so hardcoding string
.fa-trash::before {
  content: "Remove";
}

// v-bind is not working here so hardcoding string
.fa-times-circle::before {
  content: "Clear";
}

.actions-wrapper {
  display: flex;
  justify-content: space-around;
}

.reminders-wrapper {
  @apply flex flex-col-reverse mt-2
}

.tui-full-calendar-popup-detail {
  *:not(button) {
    @apply text-left
  }
}

</style>