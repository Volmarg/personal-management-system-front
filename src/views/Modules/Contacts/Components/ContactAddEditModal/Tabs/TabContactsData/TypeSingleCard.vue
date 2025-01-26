<template>
  <SmallDataBlock :is-interactive="true">
    <template #topLine>{{ contactType.name }}</template>
    <template #bottomLine>{{ typeDetails }}</template>
    <template #addition>
      <div class="img-wrapper">
        <img :src="contactType.icon_path" />
      </div>
    </template>
  </SmallDataBlock>
</template>

<script lang="ts">
import SmallDataBlock  from "@/components/Ui/Containers/SmallDataBlock.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import StringTypeProcessor from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

export default {
  data(): ComponentData {
    return {
      maxLen: 45,
    }
  },
  props: {
    contactId: {
      type: [Number, null],
      required: false,
      default: null,
    },
    contactType: {
      type: Object,
      required: true
    }
  },
  components: {
    SmallDataBlock
  },
  computed: {
    /**
     * @description returns the type details / value
     */
    typeDetails(): string {
      if (this.contactType.details.length >= this.maxLen) {
        return StringTypeProcessor.reduceStringToCharactersCount(this.contactType.details, this.maxLen);
      }

      return this.contactType.details;
    }
  }
}
</script>

<style lang="scss" scoped>
.img-wrapper {
  img {
    width: 30px;
  }

  @apply flex justify-center
}

</style>
