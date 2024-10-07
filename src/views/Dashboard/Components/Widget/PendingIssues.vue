<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.pendingIssues.header')">
    <div class="flex flex-wrap flex-row justify-between">
      <IssueBlock v-for="issue in blocksData"
                  :key="JSON.stringify(issue)"
                  :is-for-dashboard="issue.isForDashboard"
                  :contacts="issue.contacts"
                  :progress-list="issue.progressList"
                  :title="issue.title"
                  :todo="issue.todo"
                  :is-dashboard-state-visible="false"
                  :is-menu-visible="false"
                  :is-dashboard-widget="true"
                  @re-fetch-data="() => {}"
      />
    </div>

    <NoResultsText v-if="blocksData.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import IssueBlock          from "@/views/Modules/Issues/Components/IssueBlock.vue";

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
          todo: {
            id: 1,
            name: "Learn symfony framework",
            description: "Discover the magic of Symfony",
            showOnDashboard: true,
            elements: [
              {
                id: 1,
                name: "Play with demo project",
                isDone: true,
              },
              {
                id: 2,
                name: "Get some online courses",
                isDone: true,
              },
              {
                id: 3,
                name: "Create Your own project on Symfony 7.x",
                isDone: false,
              },
            ],
            module: {
              name: "issues",
              id: 1,
            }
          },
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
      ]
    }
  },
  components: {
    IssueBlock,
    NoResultsText,
    BigDataDisplayBlock
  }
}
</script>