<template>

  <div v-if="allProgress.length > 0">
    <div class="flex flex-wrap mt-10 justify-center">
      <SingleProgressComponent v-for="progress in allProgress"
                              :key="JSON.stringify(progress)"
                              :progress="progress"
                              @click="$emit('progressEditClick', {progress: progress})"
      />
    </div>

    <hr class="mt-10" />
  </div>

  <div class="flex justify-center">
    <div class="mt-6 flex flex-col w-full">
      <CreateEditProgressForm
          :header="$t('issues.pending.modal.viewEdit.tabs.progress.form.header.new')"
          :issue-id="issueId"
          @submit="$emit('closeModal')"
      />
    </div>
  </div>

</template>

<script lang="ts">
import {SingleProgress} from "@/scripts/Core/Types/Modules/Issues";

import SingleProgressComponent from "@/views/Modules/Issues/Components/ViewEditModal/Tabs/TabProgress/SingleProgress.vue";
import CreateEditProgressForm  from "@/views/Modules/Issues/Components/CreateEditProgressForm.vue";

export default {
  props: {
    allProgress: {
      type: Array as Array<SingleProgress>,
      required: true,
    },
    issueId: {
      type: Number,
      required: true,
    },
    isSubmitVisible: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  components: {
    SingleProgressComponent,
    CreateEditProgressForm,
  },
  emits: [
    'closeModal',
    'progressEditClick'
  ],
}
</script>