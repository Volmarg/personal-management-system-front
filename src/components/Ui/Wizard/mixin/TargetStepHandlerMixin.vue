<script lang="ts">
/**
 * @description provides logic for validating the "targetStep" toward the current wizard state
 */
export default {
  methods: {
    /**
     * @description is the target step last one
     */
    isTargetStepLast(targetStepName: string): boolean {
      let stepIndex = this.stepsOrder.findIndex((orderedStepName: string) => (orderedStepName === targetStepName));

      return ((stepIndex + 1) === this.stepsOrder.length);
    },
    /**
     * @description check if step has been visited.
     *              This is needed because some steps are either preview or optional steps
     *              so these would otherwise be automatically marked as done,
     *
     *              The point is that user has to be FORCED to click through all steps and SEE all the things
     *              he confirms
     */
    isTargetStepVisited(targetStepName: string): boolean {
      return this.visitedSteps.includes(targetStepName);
    },
    /**
     * @description check if target step is previous one compared to currently active step
     */
    isTargetStepPrevious(comparedStepName: string): boolean {

      let currStepIdx     = this.stepsOrder.findIndex((orderedStepName: string) => (orderedStepName === this.store.currentStep));
      let comparedStepIdx = this.stepsOrder.findIndex((orderedStepName: string) => (orderedStepName === comparedStepName));

      return (comparedStepIdx < currStepIdx);
    },
    /**
     * @description check if target step is next step compared to the given step name.
     *              Important: this is NOT "Directly after" check rather "is in-general after"
     */
    isTargetStepNext(comparedStepName: string): boolean {

      let currStepIdx     = this.stepsOrder.findIndex((orderedStepName: string) => (orderedStepName === this.store.currentStep));
      let comparedStepIdx = this.stepsOrder.findIndex((orderedStepName: string) => (orderedStepName === comparedStepName));

      return (comparedStepIdx > currStepIdx);
    },
    /**
     * @description check if user can navigate to target step
     */
    canNavigateToTargetStep(targetStepName: string): boolean {
      return (
          this.isTargetStepPrevious(targetStepName)
          ||  targetStepName === this.store.currentStep
          || (
              this.isCurrentStepValid
              && this.isTargetStepNext(targetStepName)
              && this.isStepBeforeTargetVisited(targetStepName)
          )
      );
    },
    /**
     * @description check if step is done
     */
    isTargetStepDone(targetStepName: string): boolean {
      // last step should never be considered done because that's where user needs to click sending etc.
      if (this.isTargetStepLast(targetStepName)) {
        return false;
      }

      return (this.canNavigateToTargetStep(targetStepName) && this.isTargetStepVisited(targetStepName) && this.isTargetStepValid(targetStepName));
    },
    /**
     * @description check if target step is valid
     */
    isTargetStepValid(targetStepName: string): boolean {
      return this.stepsValidity[targetStepName];
    },
    /**
     * @description check if previous step was visited (DIRECTLY PREVIOUS, NOT ANY EARLIER ONE)
     *              that's a must because some steps are optional, so if there are 2 such steps
     *              one after another then it would normally mean that user can jump straight to 2nd step
     *
     *              This should be denied as goals is to FORCE user to go through each step,
     *              this code in here makes sure that no "jump through" is being made
     */
    isStepBeforeTargetVisited(targetStepName: string): boolean {
      if (targetStepName === this.getFirstDefinedStep) {
        return true;
      }

      let targetStepIndex = this.stepsOrder.findIndex((orderedStepName: string) => (targetStepName == orderedStepName));
      let earlierStepName = this.stepsOrder[targetStepIndex - 1];

      return this.isTargetStepVisited(earlierStepName);
    },
  }
}
</script>