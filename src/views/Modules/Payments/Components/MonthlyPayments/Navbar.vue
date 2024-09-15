<template>
  <div class="flex flex-col justify-end"
       v-if="years.length > 0"
  >
    <div>
      <h2 class="text-lg text-center md:text-right pr-0 md:pr-6 mb-1">{{ $t('payments.monthly.filter.label') }}</h2>
    </div>
    <div class="flex flex-col md:flex-row justify-end">
      <MediumButtonWithIcon v-for="year in years"
                            button-classes="w-full md:w-auto flex justify-center md:block"
                            text-classes="text-center"
                            class="w-full md:w-auto mb-1 md:mb-0"
                            :key="year"
                            :text="year"
                            @button-click="$emit('yearFilterClick', year)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

export default {
  components: {MediumButtonWithIcon},
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  emits: [
    "yearFilterClick",
  ],
  computed: {
    years(): Array<number> {
      return Object.keys(this.data);
    }
  },
}
</script>