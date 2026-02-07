<template>
  <teleport to="body">
    <Modal :is-visible="isVisible"
           id="monthly-payments-import-remove-by-dates-modal"
           :title="$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.header')"
           :is-confirm-visible="false"
           :is-close-full-width="true"
           :cancel-text="$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.button.close.label')"
           @modal-closed="$emit('close')"
    >
      <template #content>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-2 ">
          <InputComponent type="date"
                          v-model="startDate"
                          :label="$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.form.startDate.label')"
          />
          <InputComponent type="date"
                          v-model="endDate"
                          :label="$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.form.endDate.label')"
          />
        </div>

        <div class="flex justify-center flex-row mb-4"
              v-if="violations.length !== 0"
        >
          <InputViolations :violations="violations"/>
        </div>

        <p class="mb-4 text-center"
           v-html="$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.text.info')"
         />

      </template>

      <template #footerRightSection>
        <MediumButtonWithIcon
            background-color-class="bg-blue-500"
            top-wrapper-classes="w-full md:w-auto"
            button-classes="w-full md:w-auto flex justify-center md:block"
            text-classes="text-center"
            class="w-full md:w-auto"
            :text="$t('generic.button.confirm.label')"
            @click="onModalSubmit"
        />
      </template>

    </Modal>
  </teleport>
</template>

<script lang="ts">

import InputComponent       from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Modal                from "@/components/Modal/Modal.vue";
import InputViolations      from "@/components/Form/InputViolations.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      violations: [],
      startDate: null,
      endDate: null,
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      required: false,
    }
  },
  emits: [
    'confirm',
    'close',
  ],
  components: {
    MediumButtonWithIcon,
    InputViolations,
    InputComponent,
    Modal,
  },
  methods: {
    /**
     * @description closes the modal, and passes the selected dates
     */
    onModalSubmit(): void {
      this.violations = [];

      if (StringTypeProcessor.isEmptyString(this.startDate) && StringTypeProcessor.isEmptyString(this.endDate)) {
        this.violations.push(this.$t('payments.monthly.tabs.import.step.processData.filterByDatesModal.text.validation'));
        return;
      }

      this.$emit('confirm', {
        startDate: this.startDate,
        endDate: this.endDate
      });

      this.startDate = null;
      this.endDate = null;

    },
  },
}
</script>