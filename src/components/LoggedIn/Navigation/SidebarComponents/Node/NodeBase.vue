<template>
  <div v-if="canSee">
    <slot :isRightGranted="isRightGranted"></slot>
  </div>
</template>

<script lang="ts">
import Logger              from "@/scripts/Core/Logger";
import UserController      from "@/scripts/Core/Controller/UserController";

import {ComponentData}  from "@/scripts/Vue/Types/Components/types";

import {userStateStore, UserStateStore} from "@/scripts/Vue/Store/UserState";

export default {
  data(): ComponentData {
    return {
      canSee: true,
      userStore: null as null | UserStateStore,
      isRightGranted: true,
    }
  },
  props: {
    requiredRight: {
      type: String as any as string | undefined,
      required: false,
      default: undefined,
    }
  },
  methods: {
    /**
     * @description check if user can see this node by checking require right
     */
    checkCanSee(): void {
      if (!this.requiredRight) {
        Logger.error("One of the menu nodes did not supplied `requiredRight` at all, and as such it will be hidden!")
        this.canSee = false;
        return;
      }

      this.canSee = this.isRightGranted || (!this.isRightGranted && !this.userStore.user.isSystemLocked);
    },
  },
  mounted(): void {
    this.userStore = userStateStore();
    this.isRightGranted = new UserController().isRightGranted(this.requiredRight);
    this.checkCanSee();
  },
  watch: {
    /**
     * @description checking if user can see the node - this must happen only AFTER new token is set in storage.
     */
    'userStore.token'(): void {
      this.isRightGranted = new UserController().isRightGranted(this.requiredRight);
      this.checkCanSee();
    }
  }
}
</script>