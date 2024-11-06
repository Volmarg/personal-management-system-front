<template>

  <div class="flex justify-center">
    <div class="mt-6 w-full flex flex-col md:w-1/2 lg:w-1/3">

      <CreateEditForm :header="$t('issues.pending.common.createEditForm.header.edit')"
                      :id="id"
                      :initial-name="name"
                      :initial-description="description"
                      :initial-show-on-dashboard="showOnDashboard"
                      @submit="$emit('closeModal')"
      />

    </div>
  </div>

</template>

<script lang="ts">
import CreateEditForm from "@/views/Modules/Issues/Components/CreateEditForm.vue";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    showOnDashboard: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    CreateEditForm,
  },
  emits: [
    'closeModal',
  ],
}
</script>