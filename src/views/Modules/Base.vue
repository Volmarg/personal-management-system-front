<template>
  <div>

    <Accordion class="important-information-accordion"
               v-if="infoBlockDescription && usedHeader"
    >
      <AccordionPanel class="accordion-panel" :initially-open="!isMobileBrowser">
        <template #title>{{usedHeader}}</template>
        <template #content><InformationBlock :text="infoBlockDescription"/></template>
      </AccordionPanel>
    </Accordion>

    <Container class="mb-3 mt-3"
               v-if="isInContainer"
    >
      <div :class="mainContentClasses">
        <slot></slot>
      </div>
    </Container>

    <div class="mb-3 mt-3"
         v-else
    >
      <div :class="mainContentClasses">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import MobileAwareMixin from "@/mixins/Awarness/MobileAwareMixin.vue";

import InformationBlock from "@/components/Page/InformationBlock.vue";
import Container        from "@/components/Ui/Containers/Container.vue";
import Accordion        from "@/components/Ui/Accordion/Accordion.vue";
import AccordionPanel   from "@/components/Ui/Accordion/Panel.vue";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      usedHeader: '',
    }
  },
  props: {
    mainContentClasses: {
      type: [Object, null],
      required: false,
      default: null,
    },
    isInContainer: {
      type: Boolean,
      required: false,
      default: true,
    },
    infoBlockDescription: {
      type: String,
      required: false,
      default: ''
    },
    infoBlockHeader: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    AccordionPanel,
    Accordion,
    Container,
    InformationBlock
  },
  mixins: [
    MobileAwareMixin
  ],
  created(): void {
    if (this.infoBlockHeader) {
      this.usedHeader = this.infoBlockHeader;
    }

    if (this.infoBlockDescription && !this.infoBlockHeader) {
      this.usedHeader = this.$t('generic.about');
    }
  }
}
</script>