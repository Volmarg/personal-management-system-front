<template>
    <div class="file-list-element-wrapper">

    <!-- status -->
    <div class="align-self-center mx-2">
      <span v-if="isNewFile">
        <la svg-icon-name="times-circle-solid"
            :font-size="30"
            color="red"
            v-tippy="{
              content: $t('health.overview.tabs.subTabs.tabs.files.text.notSaved')
            }"
        />
      </span>

      <span v-else>
        <la svg-icon-name="check-circle-solid"
            :font-size="30"
            color="green"
            v-tippy="{
              content: $t('health.overview.tabs.subTabs.tabs.files.text.saved')
            }"
        />
      </span>
    </div>

    <!-- download -->
    <a class="w-full flex items-center justify-start bg-white dark:bg-gray-800 text-blue-500 shadow p-4 cursor-pointer hover:opacity-70 flex-wrap sm:flex-nowrap"
       :href="filePath"
       download
       v-tippy="{
          content: $t('health.overview.tabs.subTabs.tabs.files.text.download'),
          placement: 'top'
       }"
    >
      <div class="">{{ usedFileName }}</div>
    </a>

    <AppointmentSelect @change="onAppointmentChange"
                       :violations="violations.appointmentId"
                       v-model="appointmentId"
                       :illness-id="illnessId"
    />

    <!-- button -->
    <div class="remove-button-wrapper">
      <MediumButtonWithIcon :margin-right-class-number="0"
                            :top-wrapper-classes="{
                              'w-full': true,
                              'h-full': true,
                            }"
                            button-classes="w-full h-full flex flex-col justify-center !border-r-0"
                            background-color-class="bg-red-500"
                            @button-click="$emit('removeFile', {id: fileId})"
                            v-tippy="$t('health.overview.tabs.subTabs.tabs.files.text.unlinkFile')"
      >
        <template #icon>
          <fa icon="trash"
              class="text-2md"
              :is-margin-right="false"
          />
        </template>
      </MediumButtonWithIcon>
    </div>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import AppointmentSelect    from "@/views/Modules/Health/Components/Common/AppointmentSelect.vue";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {HealthFileStateEnum} from "@/scripts/Core/Types/Modules/Health";

import {ComponentData, ComponentSetup, ComponentValidation} from "@/scripts/Vue/Types/Components/types";

import useVuelidate        from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  setup: (): ComponentSetup => ({v$: useVuelidate()}),
  data(): ComponentData {
    return {
      config: {
        maxFilenameLength: 75,
      },
      appointmentId: null,
      violations: {
        appointmentId: []
      },
    }
  },
  validations(): ComponentValidation{
    return {
      appointmentId: {
        required: helpers.withMessage(this.$t('validation.type.requiredField'), required),
      },
    }
  },
  props: {
    fileNameWithExt: {
      required: true,
      type: String,
    },
    filePath: {
      required: true,
      type: String,
    },
    fileId: {
      required: true,
      type: String,
    },
    fileState: {
      required: true,
      type: String,
    },
    illnessId: {
      required: true,
      type: Number,
    },
    fileAppointmentId: {
      type: [Number, null],
      required: false,
      default: null
    }
  },
  components: {
    MediumButtonWithIcon,
    AppointmentSelect,
  },
  mixins: [
    VuelidateHandler,
  ],
  emits: [
    'removeFile',
    'appointmentChange'
  ],
  computed: {
    /**
     * @description check if a given file is new or was it allready assigned to the appointment
     */
    isNewFile(): boolean {
      return this.fileState === HealthFileStateEnum.confirmed;
    },
    /**
     * @description reduces the file name if its to long
     */
    usedFileName(): string {
      if (this.fileNameWithExt.length <= this.config.maxFilenameLength) {
        return this.fileNameWithExt;
      }

      return this.fileNameWithExt.substr(0, this.config.maxFilenameLength) + "...";
    },
  },
  methods: {
    /**
     * @description tracks change appointment id, emits info that appointment was changed, triggers element validation
     */
    onAppointmentChange(data): void {
      this.appointmentId = data;
      this.$emit('appointmentChange', {appointmentId: this.appointmentId});
      this.validateData();
    },
    /**
     * @description Validates the form, returns bool as indication if everything is fine (true = OK),
     */
    validateData(): boolean {
      this.v$.$validate();

      this.violations = this.vuelidateErrorsToPropsViolation(this.v$.$errors);

      return (0 === Object.keys(this.violations).length);
    }
  },
  mounted(): void {
    this.appointmentId = this.fileAppointmentId;
  },
}
</script>

<style lang="scss" scoped>
.remove-button-wrapper {
  min-width: 54px;
}

.file-list-element-wrapper {
  min-width: 800px;
  @apply flex w-full gap-x-1;
}
</style>