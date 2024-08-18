<template>
  <div class="flex flex-col align-self-baseline mt-2 md:mt-0 w-full">

    <h5 class="header align-self-center">
     {{ $t('infoPage.footerSection.contact.header') }}
    </h5>

    <div class="align-self-baseline emails-wrapper">
      <a
          v-for="(emailData, index) in emails"
          class="email-link"
          :href="'mailto:' + emailData.address"
          :key="index"
      >
        {{ emailData.text }}
        <span
            v-show="!isTabletBreakingPoint"
            class="ml-2 text-gray-700"
        > | </span>

      </a>
    </div>

  </div>
</template>

<script lang="ts">
import {ComponentData}     from "@/scripts/Vue/Types/Components/types";
import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  data(): ComponentData {
    return {
      emails: [
        {
          address: 'test@test.pl',
          text: this.$t('infoPage.footerSection.contact.emails.support.label')
        },
        {
          address: 'test@test.pl',
          text: this.$t('infoPage.footerSection.contact.emails.bugs.label')
        },
        {
          address: 'test@test.pl',
          text: this.$t('infoPage.footerSection.contact.emails.ban.label')
        },
        {
          address: 'test@test.pl',
          text: this.$t('infoPage.footerSection.contact.emails.creditsResources.label')
        },
        {
          address: 'test@test.pl',
          text: this.$t('infoPage.footerSection.contact.emails.other.label')
        }
      ]
    }
  },
  mixins: [
      ResponsiveVarsMixin
  ]
}
</script>

<style lang="scss" scoped>
.header {
  @apply mb-4 text-white text-left text-2xl md:font-normal ml-2
}

.emails-wrapper {
  @apply ml-4 md:ml-0
}

.email-link {
  @apply text-white cursor-pointer hover:opacity-50 text-left duration-75 block md:inline
}

.email-link + .email-link {
  @apply ml-0 md:ml-2
}
</style>