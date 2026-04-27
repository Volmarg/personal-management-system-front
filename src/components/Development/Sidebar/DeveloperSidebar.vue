<template>
  <!-- Xdebug session name -->
  <div class="w-100 flex justify-end dev-sidebar">
    <section class="w-3/4 flex flex-col mr-5">

      <vue-input :label="$t('dev.xdebugKey.label')"
                 :question-mark-text="$t('dev.xdebugKey.helpText')"
                 type="text"
                 v-model="xdebugSessionName"
                 ref="xdebugSessionName"
      />

      <div class="flex flex-row justify-end">
        <question-mark :text="$t('dev.symfonyProfiler.helpText')"
                       class="align-self-center"
        />

        <a :href="absoluteProfilerUrl"
           target="_blank"
        >
          <medium-button-with-icon :text="$t('dev.symfonyProfiler.label')"
                                   :margin-right-class-number="0"
          >
            <template #icon>
              <fa icon="wrench"/>
            </template>
          </medium-button-with-icon>
        </a>
      </div>

      <DeveloperPlaygroundButton :help-text="$t('dev.playground.helpText')"
                                 :label-text="$t('dev.playground.label')"
                                 :route="routes.developer.playgroudFrontend"
      />

      <DeveloperPlaygroundButton :help-text="$t('dev.playgroundBackend.helpText')"
                                 :label-text="$t('dev.playgroundBackend.label')"
                                 :url="backendDebugUrl"
      />

    </section>
  </div>

</template>

<script lang="ts">
import {ComponentData}           from "@/scripts/Vue/Types/Components/types";

import LocalStorageService       from "@/scripts/Core/Services/Storage/LocalStorageService";
import UserController            from "@/scripts/Core/Controller/UserController";
import UserRoles              from "@/scripts/Core/Security/UserRoles";
import BaseError                 from "@/scripts/Core/Error/BaseError";

import SymfonyProfilerAwareMixin from "@/mixins/Awarness/SymfonyProfilerAwareMixin.vue";

import Input                     from "@/components/Form/Input.vue";
import DeveloperPlaygroundButton from "@/components/Development/Sidebar/Components/DeveloperPlaygroundButton.vue";
import MediumButtonWithIcon      from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Fontawesome               from "@/components/Libs/Fontawesome.vue";
import QuestionMarkAbout         from "@/components/Ui/QuestionMarkAbout.vue";
import VueRouter from "@/router/VueRouter";
import SymfonyDevRoutes from "@/router/SymfonyRoutes/SymfonyDevRoutes";

export default {
  name: "DeveloperSidebar",
  data: (): ComponentData => {
    return {
      xdebugSessionName: "",
      routes: {
        developer: {
          playgroudFrontend: VueRouter.ROUTE_PATH_DEVELOPMENT_PLAYGROUND
        }
      },
    }
  },
  mixins: [
    SymfonyProfilerAwareMixin
  ],
  components: {
    "vue-input" : Input,
    "fa": Fontawesome,
    "medium-button-with-icon" : MediumButtonWithIcon,
    "question-mark"           : QuestionMarkAbout,
    DeveloperPlaygroundButton
  },
  created(): void {
    this.xdebugSessionName = LocalStorageService.get(LocalStorageService.XDEBUG_TOKEN);
  },
  computed: {
    backendDebugUrl(): string {
      return SymfonyDevRoutes.buildUrl(SymfonyDevRoutes.DEV_DEBUG_ROUTE);
    }
  },
  watch: {
    xdebugSessionName(newValue: string): void {
      LocalStorageService.set(LocalStorageService.XDEBUG_TOKEN, newValue);
    }
  },
  beforeCreate() {
    let userController = new UserController();
    if (!userController.isRoleGranted(UserRoles.ROLE_DEVELOPER)) {
      throw new BaseError("User is not a developer, the developer sidebar should not be created!", {
        "user": userController.getLoggedInUserData(),
      })
    }
  }
}
</script>