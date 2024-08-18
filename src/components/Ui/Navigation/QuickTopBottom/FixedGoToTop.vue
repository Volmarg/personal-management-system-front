<template>
  <FloatingBox
      :show-background="false"
      class="fixed-go-to-top"
      @click="goToTop()"
  >
    <FullRoundButtonWithIcon
        :slide-able="false"
        @click="$emit('showEmailWizardClicked')"
    >
      <template #icon>
        <la
            svg-icon-name="chevron-up-solid"
            color="white"
        />
      </template>
    </FullRoundButtonWithIcon>
  </FloatingBox>
</template>

<script lang="ts">
import FloatingBox             from "@/components/Ui/Containers/FloatingBox.vue";
import FullRoundButtonWithIcon from "@/components/Navigation/Button/FullRoundButtonWithIcon.vue";

export default {
  components: {
    FloatingBox,
    FullRoundButtonWithIcon
  },
  methods: {
    /**
     * @description scroll the page to top
     */
    goToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
</script>
