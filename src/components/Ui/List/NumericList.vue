<template>
  <div>
    <ol class="numeric-list">
      <slot></slot>
    </ol>
  </div>
</template>

<script lang="ts">

/**
 * @description List with numeric elements
 * @example
 * ```vue
 *     <NumericList>
 *       <SingleElement v-for="(partialAnalyse, index) in jobOffer.partialAnalyzes"
 *                      :classes="statusToBgColor(partialAnalyse)"
 *                      :key="index"
 *       >
 *        <template #marker-content></template>
 *        <template #general-content></template>
 *        </SingleElement>
 *       </NumericList>
 * ```
 */
export default {

}
</script>

<style lang="scss" scoped>
ol {
  counter-reset: li;
  list-style: none;
  padding: 0;
}
</style>