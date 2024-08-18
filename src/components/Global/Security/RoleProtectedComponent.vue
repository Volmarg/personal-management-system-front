<template>
  <div v-if="isRoleGranted()">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import UserController from "@/scripts/Core/Controller/UserController";

let userController = new UserController();

/**
 * @description this component can be used to check if underlying content should be visible only when given role is provided
 *              for example user with role ADMIN might see everything but ADMIN + DEVELOPER might see some debugging box
 */
export default {
  props: {
    requiredRole: {
      type     : String,
      required : true,
    }
  },
  methods: {
    /**
     * @description check if user role is granted
     */
    isRoleGranted(): boolean {
      return ( userController.isRoleGranted(this.requiredRole) );
    }
  }
}
</script>