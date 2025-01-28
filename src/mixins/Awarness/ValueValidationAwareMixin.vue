<script lang="ts">

export default {
  computed: {
    msgRequiredField(): string {
      return this.$t('validation.type.requiredField');
    }
  }
}
</script>