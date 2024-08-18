<template>
  <div>

    <Modal
        :is-visible="isVisible"
        :title="$t('infoPage.modal.credits.header')"
        :is-close-visible="true"
        :is-close-full-width="true"
        :cancel-text="$t('infoPage.modal.credits.button.close.label')"
        :cancel-button-margin-right-class-number="0"
        size="medium"
        @modal-closed="$emit('modalClosed')"
    >
      <template #content>
        <p>
          {{ $t('infoPage.modal.credits.description') }}
        </p>
        <p class="italic">
          {{ $t('infoPage.modal.credits.description2') }}
        </p>

        <hr class="w-full mt-2 mb-2"/>

        <div class="badges-list">

          <a
              v-for="badgeData in getBadges()"
              target="_blank"
              :key="JSON.stringify(badgeData.resourceUrl)"
              :href="badgeData.resourceUrl"
          >
            <img
                :src="badgeData.imageUrl"
                class="credit-badge"
                :class="{
                  'border border-gray-50': badgeData.border
                }"
            />
          </a>

        </div>
      </template>
    </Modal>

  </div>
</template>

<script lang="ts">
import Modal                from "@/components/Modal/Modal.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isVisible: false,
    }
  },
  props: {
    forceIsVisible: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  components: {
    Modal,
    MediumButtonWithIcon,
  },
  methods: {
    getBadges(): Array<Record<string, string | boolean>> {
      return [
      ]
    },
  },
  created(): void {
    this.isVisible = this.forceIsVisible;
  },
  watch: {
    forceIsVisible(): void {
      this.isVisible = this.forceIsVisible;
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-badge {
  width: 150px;
  min-width: 150px;
  height: 40px;
}

.badges-list {
  @apply flex gap-2 flex-wrap
}
</style>