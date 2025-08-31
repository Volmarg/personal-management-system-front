<template>
  <div>

    <div class="wizard-body">
      <slot name="steps"></slot>
    </div>

    <!-- these are the lined steps with names -->
    <div>
      <hr class="mt-4" />
      <NavSteps class="mt-4">
        <NavStep
            v-for="(stepName, index) in stepsOrder"
            :key="index"
            :step-number="(index + 1)"
            :is-active="store.currentStep === stepName"
            :is-last-step="isTargetStepLast(stepName)"
            :is-done="isTargetStepDone(stepName)"
            :label="stepsLabels[stepName]"
            :can-navigate="canNavigateToTargetStep(stepName)"
            @click="goToStep(stepName)"
        />
      </NavSteps>
    </div>

  </div>
</template>

<script lang="ts">
import TargetStepHandlerMixin from "@/components/Ui/Wizard/mixin/TargetStepHandlerMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import ArrayTypeProcessor from "@/scripts/Core/Services/TypesProcessors/ArrayTypeProcessor";
import TypeChecker from "@/scripts/Core/Services/Types/TypeChecker";

import NavStep from "@/components/Ui/Wizard/NavStep.vue";
import NavSteps from "@/components/Ui/Wizard/NavSteps.vue";

/**
 * @description in general this could've been done better, but the code is copied from my other project with some adjustments to it.
 */
export default {
  data(): ComponentData {
    return {
      stepsValidity: {} as Record<string, boolean>,
      visitedSteps: [] as Array<string>,
      currentStep: null,
      isCurrentStepValid: false,
    };
  },
  components: {
    NavSteps,
    NavStep,
  },
  emits: [],
  mixins: [
    TargetStepHandlerMixin,
  ],
  props: {
    store: {
      type: Object,
      required: true,
    },
    /**
     * @deprecated The values should be used on steps refs, since it's the used to identify the steps,
     * @example
     *         previewTemplate: "previewTemplate",
     *         selectTemplate: "selectTemplate",
     *         selectAttachments: "selectAttachments",
     *         confirmation: "confirmation",
     */
    steps: {
      type: Object,
      required: true,
    },
    /**
     * @description the steps prop names should be used here, this array defines order of steps
     * @example
     *         "previewTemplate",// 1st
     *         "selectTemplate", // 2nd
     *         "selectAttachments", // 3rd
     *         "confirmation", // 4th
     */
    stepsOrder: {
      type: Array,
      required: true
    },
    /**
     * @example
     *         "previewTemplate": "Preview Template",
     *         "selectTemplate": "Select template",
     *         "selectAttachments": "Select attachments",
     *         "confirmation": "Confirmation"
     */
    stepsLabels: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /**
     * @description returns the amount/count of defined steps
     */
    stepsCount(): number {
      return this.stepsOrder.length;
    },
    /**
     * @description will return array index for currently selected template from steps order
     */
    selectedStepIndex(): number | null {
      return ArrayTypeProcessor.findFirstByValue(this.store.currentStep, this.stepsOrder);
    },
    /**
     * @description will return array number of currently selected template from steps order
     *              adding +1 since indexes are starting from 0
     */
    selectedStepNumber(): number | null {
      let stepIndex = ArrayTypeProcessor.findFirstByValue(this.store.currentStep, this.stepsOrder);
      return (TypeChecker.isNull(stepIndex) ? null : stepIndex as number + 1);
    },
    /**
     * @description will return first step name
     */
    getFirstDefinedStep(): string {
      return this.stepsOrder[0];
    },
    /**
     * @description check if this is the last step
     */
    isLastStep(): boolean {
      return this.selectedStepNumber == this.stepsCount;
    },
    /**
     * @description check if this is the first step
     */
    isFirstStep(): boolean {
      return this.selectedStepNumber == 1;
    }
  },
  methods: {
    /**
     * @description triggers logic when step gets validated
     */
    updateStepValidity(isValid: boolean): void {
      this.isCurrentStepValid = isValid;
      this.stepsValidity[this.store.currentStep] = isValid
    },
    /**
     * @description move to target step IF possible
     */
    goToStep(targetStepName: string): void {
      if (!this.canNavigateToTargetStep(targetStepName)) {
        return;
      }

      this.store.setCurrentStep(targetStepName);
      this.visitedSteps.push(this.store.currentStep);
      this.validateCurrentStep();
    },
    /**
     * @description handles going to next step
     */
    nextStep(): void {
      if (
          this.isLastStep
          || !this.isCurrentStepValid // should not happen but just in case someone decides to manipulate dom
      ) {
        return;
      }

      let nextStepArrayIndex = this.selectedStepIndex + 1;
      this.store.setCurrentStep(this.stepsOrder[nextStepArrayIndex]);

      this.visitedSteps.push(this.store.currentStep);
      this.validateCurrentStep();
    },
    /**
     * @description handles going to previous step
     */
    previousStep(): void {
      if (this.isFirstStep) {
        this.validateCurrentStep();
        return;
      }

      let previousStepArrayIndex = this.selectedStepIndex - 1;
      this.store.setCurrentStep(this.stepsOrder[previousStepArrayIndex]);
    },
    /**
     * @description will check if current step is valid
     */
    validateCurrentStep(): void {
      if (this.isLastStep) {
        this.isCurrentStepValid = true;
        return;
      }

      // info: we look on parent due to in-slot placed steps
      let stepComponent = this.$parent.$refs[this.store.currentStep];
      this.isCurrentStepValid = stepComponent.isValid();

      this.stepsValidity[this.store.currentStep] = this.isCurrentStepValid
    },
  },
  created(): void {
    this.store.setCurrentStep(this.getFirstDefinedStep);
    this.visitedSteps.push(this.store.currentStep);
  },
  mounted(): void {
    this.validateCurrentStep();
  },
  watch: {
    selectedStepNumber(): void {
      if (this.store) {
        this.store.setLastStepState(this.isLastStep);
        this.store.setFirstStepState(this.isFirstStep);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wizard-body {
  max-height: 75vh;
  min-height: 50vh;
  @apply overflow-y-scroll
}
</style>