<template>
  <div v-if="entries = getOwedEntries(true)"
       class="single-section"
  >
    <p class="section-header">{{ $t('payments.moneyOwed.tabs.summary.text.owedByMe') }}</p>
    <ul>
      <li class="one-entry"
          v-for="entry in entries"
          :key="JSON.stringify(entry)"
          v-html=" $t('payments.moneyOwed.tabs.summary.text.i-owe-to', {target: entry.target, amount: entry.amount, currency: entry.currency})"
      />
    </ul>
  </div>

  <div v-if="entries = getOwedEntries(false)"
       class="single-section"
  >
    <p class="section-header">{{ $t('payments.moneyOwed.tabs.summary.text.owedByOthers') }}</p>
    <ul>
      <li class="one-entry"
         v-for="entry in entries"
         :key="JSON.stringify(entry)"
         v-html=" $t('payments.moneyOwed.tabs.summary.text.other-owe', {target: entry.target, amount: entry.amount, currency: entry.currency})"
      />
    </ul>
  </div>

</template>

<script lang="ts">


export default {
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  methods: {
    /**
     * @description return owning entries
     */
    getOwedEntries(owedByMe: boolean): Record<string, Record<string, string | number >> | null {
      let data = {};
      for (let chunk of this.data) {
        if (chunk.values.owedByMe.rawValue === owedByMe) {
          let key = chunk.values.target.value + chunk.values.currency.value;
          if (!Object.keys(data).includes(key)) {
            data[key] = {
              "amount": 0,
              "target": chunk.values.target.value,
              "currency": chunk.values.currency.value
            };
          }

          data[key]["amount"] += chunk.values.amount.value;
        }
      }

      if (Object.keys(data).length === 0) {
        return null;
      }

      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
.single-section {
  & + .single-section {
    @apply mt-2
  }

  &:first-of-type {
    @apply mt-5
  }

  @apply text-left
}

ul {
  @apply list-disc ml-5
}

.section-header {
  @apply text-lg font-bold
}
</style>