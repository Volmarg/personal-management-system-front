<template>
  <section
      class="pt-0"
      id="faq"
  >
    <div class="container">
      <div class="row">
        <div class="w-full pr-3 pl-3">

          <div class="title-box text-center"><h2>
            {{ $t('infoPage.section.faq.header') }}
          </h2>
            <p>
              {{ $t('infoPage.section.faq.text') }}
            </p>
          </div>

          <Accordion>
            <AccordionPanel
                class="accordion-panel"
                v-for="x in 7"
                :key="x"
            >
              <template #title>
                <span class="accordion-title break-words pr-4 sm:pr-0">
                  {{ $t(`infoPage.section.faq.questions.${x}.question`) }}
                </span>
              </template>
              <template #content>
                <div
                    class="accordion-content-wrapper"
                    v-html="$t(`infoPage.section.faq.questions.${x}.answer`)"
                >
                </div>
              </template>
            </AccordionPanel>
          </Accordion>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Accordion      from "@/components/Ui/Accordion/Accordion.vue";
import AccordionPanel from "@/components/Ui/Accordion/Panel.vue";

export default {
  components: {
    AccordionPanel,
    Accordion
  },
}
</script>

<style lang="scss" scoped>
.accordion-content-wrapper {
  @apply mb-4 text-left p-2
}
</style>

<style lang="scss">
.accordion-panel {
  h2 {
    box-shadow: rgba(0, 0, 0, 0.04115) 0px 3px 3px 0px;
    @apply mb-2
  }

  .accordion-title {
    @apply text-left inline-block w-full pl-2 font-normal
  }

  .content-wrapper {
    @apply mb-0
  }
}

</style>