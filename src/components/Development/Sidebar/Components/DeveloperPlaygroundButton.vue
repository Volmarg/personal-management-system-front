<template>
  <div>

    <div class="flex flex-row justify-end">
      <QuestionMarkAbout :text="$t('developer.playground.helpText')"
                     class="align-self-center"
      />

      <RouterLink :to="routes.developer.playgroud"
                   class="mt-2 block"
      >
        <MediumButtonWithIcon :text="$t('developer.playground.label')"
                                 :margin-right-class-number="0"
        >
          <template #icon>
            <fa icon="wrench"/>
          </template>
        </MediumButtonWithIcon>
      </RouterLink>

    </div>

  </div>
</template>

<script lang="ts">
import QuestionMarkAbout    from "@/components/Ui/QuestionMarkAbout.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";

import VueRouter from "@/router/VueRouter";

export default {
  data() {
    return {
      routes: {
        developer: {
          playgroud: VueRouter.ROUTE_PATH_DEVELOPMENT_PLAYGROUND
        }
      },
    }
  },
  components: {
    QuestionMarkAbout,
    MediumButtonWithIcon
  }
}
</script>