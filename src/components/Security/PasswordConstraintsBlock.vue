<template>
  <PageDescriptionBlock class="mb-6">
    <div class="text-left">
      <p class="font-bold"> {{ $t('password.constraints.label') }}</p>
      <p class="list-element" v-for="constraint in passwordConstraints">
        <ua />
        {{ constraint }},
      </p>
    </div>
  </PageDescriptionBlock>
</template>

<script lang="ts">
import PasswordConstraintsMixin from "@/mixins/System/PasswordConstraintsMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import PageDescriptionBlock from "@/components/Page/InformationBlock.vue";

export default {
  data(): ComponentData {
    return {
      passwordConstraints: [],
    }
  },
  mixins: [
    PasswordConstraintsMixin,
  ],
  components: {
    PageDescriptionBlock,
  },
  async created(): Promise<void> {
    let response             = await this.getPasswordConstraintsResponse();
    this.passwordConstraints = response.constraints;
  },
}
</script>

<style lang="scss" scoped>
.list-element {
  @apply pt-1 ml-2
}
</style>