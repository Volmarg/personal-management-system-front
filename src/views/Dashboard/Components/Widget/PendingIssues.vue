<template>
  <BigDataDisplayBlock :header="$t('dashboard.widget.pendingIssues.header')">
    <div class="flex flex-wrap flex-row justify-between">
      <IssueBlock v-for="issue in data"
                  :key="JSON.stringify(issue)"
                  :description="issue.description"
                  :is-for-dashboard="issue.isForDashboard"
                  :contacts="issue.contacts"
                  :progress-list="issue.progress"
                  :title="issue.name"
                  :todo="issue.todo"
                  :is-dashboard-state-visible="false"
                  :is-menu-visible="false"
                  :is-dashboard-widget="true"
                  @re-fetch-data="() => {}"
      />
    </div>

    <NoResultsText v-if="data.length === 0" />
  </BigDataDisplayBlock>
</template>

<script lang="ts">
import BigDataDisplayBlock from "@/views/Dashboard/Components/BigDataDisplayBlock.vue";
import NoResultsText       from "@/components/Page/NoResultsText.vue";
import IssueBlock          from "@/views/Modules/Issues/Components/IssueBlock.vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    }
  },
  components: {
    IssueBlock,
    NoResultsText,
    BigDataDisplayBlock
  }
}
</script>