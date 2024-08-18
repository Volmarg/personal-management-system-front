<template>
  <FloatingBox
      :show-background="false"
      class="fixed-go-to-top"
      @click="goToBottom()"
  >
    <FullRoundButtonWithIcon
        :slide-able="false"
        @click="$emit('showEmailWizardClicked')"
    >
      <template #icon>
        <la
            svg-icon-name="chevron-down-solid"
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
    goToBottom(): void {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }
}
</script>