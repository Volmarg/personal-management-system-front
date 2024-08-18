<template>
  <Accordion>
    <AccordionPanel>

      <template #title>
        {{ $t('page.components.about.accordion.header.label') }}
      </template>

      <template #content>

        <InformationBlock class="mb-5 bg-white text-gray-500 text-2md">
          <div class="text-left">
            <slot></slot>
          </div>
        </InformationBlock>

      </template>
    </AccordionPanel>
  </Accordion>
</template>

<script lang="ts">
import Accordion        from "@/components/Ui/Accordion/Accordion.vue";
import AccordionPanel   from "@/components/Ui/Accordion/Panel.vue";
import InformationBlock from "@/components/Page/InformationBlock.vue";

export default {
  components: {
    InformationBlock,
    AccordionPanel,
    Accordion
  }
}
</script>