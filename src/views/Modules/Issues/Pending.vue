<template>
  <Base :info-block-description="$t('issues.pending.description')"
        :is-in-container="false"
  >
    <div class="flex justify-start flex-row flex-wrap w-full"
         v-if="blocksData.length > 0"
    >
      <IssueBlock v-for="issue in blocksData"
                  :key="JSON.stringify(issue)"
                  :is-for-dashboard="issue.isForDashboard"
                  :contacts="issue.contacts"
                  :progress-list="issue.progressList"
                  :title="issue.title"
                  :todo="issue.todo"
                  @re-fetch-data="() => {}"
      />
    </div>

    <Container v-else>
      <NoResultsText />
    </Container>

  </Base>

  <AddNewModal :is-modal-visible="isAddNewModalVisible"
               @modal-closed="isAddNewModalVisible = false"
               title="todo"
  >

  </AddNewModal>
  <FloatingRoundedPlus class="mb-10"
                       @click="isAddNewModalVisible=true"
                       :hover-text="$t('issues.pending.button.addNew.hoverText')"
  />
</template>

<script lang="ts">

import Base          from "@/views/Modules/Base.vue";
import Container     from "@/components/Ui/Containers/Container.vue";
import IssueBlock    from "@/views/Modules/Issues/Components/IssueBlock.vue";
import AddNewModal   from "@/views/Modules/Issues/Components/AddNewModal.vue";
import NoResultsText from "@/components/Page/NoResultsText.vue";

import FloatingRoundedPlus from "@/components/Ui/Floating/FloatingRoundedPlus.vue";

import MobileAwareMixin from "@/mixins/Awarness/MobileAwareMixin.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      /**
       * @description dummy data
       */
      blocksData: [
        {
          title: "Eat tiny cookies",
          hasRelatedTodo: false,
          todo: {},
          contacts: [1,2,3],
          progressList: [1,2,3],
          isForDashboard: true
        },
        {
          title: "Steal some moniez",
          hasRelatedTodo: true,
          todo: {},
          contacts: [1,2,3],
          progressList: [1,2,3],
          isForDashboard: false
        },
      ],
      isAddNewModalVisible: false,
    }
  },
  components: {
    Base,
    Container,
    IssueBlock,
    AddNewModal,
    NoResultsText,
    FloatingRoundedPlus,
  },
  mixins: [
    MobileAwareMixin
  ]
}
</script>