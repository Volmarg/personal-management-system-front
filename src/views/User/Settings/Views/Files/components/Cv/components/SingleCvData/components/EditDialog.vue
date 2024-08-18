<template>
  <Modal :title="$t('views.user.settings.files.modal.header.label')"
         :is-visible="isVisible"
         :is-close-visible="true"
         :is-close-full-width="true"
         @modal-closed="$emit('modalClosed')"
         size="medium"
  >
    <template #cancelButton>
      <MediumButtonWithIcon
          :text="$t('userSettings.personalDataModal.buttons.close.label')"
          margin-right-class="mr-0"
          class="w-full sm:w-auto m-0-force"
          button-classes="w-full sm:w-auto"
          text-classes="text-center w-full"
          @click="$emit('modalClosed')"
      />
    </template>

    <template #content>
      <div class="flex justify-center mb-0">
        <UserBasedNameInput
            :initial-name="initialUserBasedName ?? ''"
            v-model="userBasedName"
        />


        <la svg-icon-name="save-solid"
            :font-size="30"
            color="green"
            class="hover:opacity-50 cursor-pointer align-self-center ml-4"
            @click="$emit('clickedSave')"
            v-tippy="$t('views.user.settings.files.modal.singleCvData.actions.save')"
        />

      </div>
    </template>
  </Modal>

</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import UserBasedNameInput   from "@/views/User/Settings/Views/Files/components/Cv/components/SingleCvData/components/UserBasedNameInput.vue";
import Modal                from "@/components/Modal/Modal.vue";

import {UserData}        from "@/scripts/Core/Types/UserData";
import {ComponentData}   from "@/scripts/Vue/Types/Components/types";
import UploadedFileDTO   from "@/scripts/Dto/File/UploadedFileDTO";
import la from "@/components/Ui/Icons/LineAwesome.vue";

export default {
  data(): ComponentData {
    return {
      userBasedName: '',
      cvFiles          : [] as Array<UploadedFileDTO>,
      loggedInUserData : null as null | UserData,
      formConfigId     : '308b18b64b73fdcae6d08c7974469652f8ab7343',
    }
  },
  props: {
    initialUserBasedName: {
      type: [String, null],
      required: true,
    },
    isVisible: {
      type     : Boolean,
      required : false,
    }
  },
  emits: [
    'modalClosed',
    'userBasedNameChanged',
    'clickedSave'
  ],
  components: {
    la,
    UserBasedNameInput,
    Modal,
    MediumButtonWithIcon,
  },
  watch: {
    userBasedName(): void {
      this.$emit('userBasedNameChanged', {
        value: this.userBasedName,
      })
    }
  }
}
</script>