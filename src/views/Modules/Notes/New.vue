<template>
  <Base :info-block-description="$t('notes.new.description')">
    <CreateUpdateForm :header="$t('notes.common.createUpdateForm.header.create')"/>
  </Base>
</template>

<script lang="ts">
import Base             from "@/views/Modules/Base.vue";
import CreateUpdateForm from "@/views/Modules/Notes/Components/Note/CreateUpdateForm.vue";

export default {
  components: {
    CreateUpdateForm,
    Base,
  },
}
</script>