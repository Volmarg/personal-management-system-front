<template>
  <div class="flex flex-col">

    <vue-input
        :type="(isPreview ? 'text' : 'password')"
        :class="{
          'm-0-force' : true,
          'mb-2'      : true
        }"
        :label="shownLabel"
        :is-required="true"
        :errors="violations"
        :is-disabled="disabled"
        v-model="password"
        @input="onPasswordInput()"
    />

    <slot></slot>

    <div
        class="mb-2 mt-2 align-self-end flex md:flex-row justify-center sm:gap-0 gap-4 w-full sm:w-auto"
        :class="{
          'flex-col': isPhoneBreakingPoint
        }"
    >

      <div
          class="align-self-center hover:opacity-70 cursor-pointer"
          v-if="!isPhoneBreakingPoint"
          @click="togglePreview()"
          v-tippy="$t('security.register.form.previewPassword.text')"
      >
        <fa
            :icon="['far', 'eye']"
            class="text-3xl text-gray-500"
        />
      </div>

      <button-rounded @click="togglePreview()"
                      :text="$t('security.register.form.previewPassword.text')"
                      button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                      v-if="isPhoneBreakingPoint"
      />

      <MediumButtonWithIcon
          @click="generatePassword()"
          :text="$t('security.register.form.generatePassword.label')"
          :disabled="disabled"
          button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
          class="w-full sm:w-auto m-0-force"
          button-classes="w-full sm:w-auto m-0-force"
          text-classes="text-center w-full"
        />
    </div>

  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import ButtonRounded        from "@/components/Navigation/Button/ButtonRounded.vue";
import VueInput             from "@/components/Form/Input.vue";

import GeneratePassword from "@/scripts/Libs/GeneratePassword";
import {ComponentData}  from "@/scripts/Vue/Types/Components/types";

import ResponsiveVarsMixin from "@/mixins/Responsive/ResponsiveVarsMixin.vue";

export default {
  name: "PasswordWithPreview",
  data(): ComponentData {
    return {
      isPreview : false,
      password  : this.modelValue,
    }
  },
  props: {
    shownLabel: {
      type     : String,
      required : true,
    },
    violations: {
      type     : Array,
      required : false,
      default  : (): Array<string> => {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      required: false,
      default: "",
    }
  },
  emits: [
    'passwordChanged',
    'passwordGenerated'
  ],
  components: {
    "button-rounded" : ButtonRounded,
    "vue-input"      : VueInput,
    MediumButtonWithIcon
  },
  mixins: [
    ResponsiveVarsMixin,
  ],
  methods: {
    /**
     * @description will toggle the preview
     */
    togglePreview(): void {
      this.isPreview = !this.isPreview;
    },
    /**
     * @description will generate password
     */
    generatePassword(): void {
      if (this.disabled) {
        return;
      }

      let generatedPassword = GeneratePassword.generatePassword(10);
      this.password         = generatedPassword;
      this.$emit('passwordGenerated', generatedPassword);
    },
    /**
     * @description will return the password
     */
    getPassword(): string {
      return this.password;
    },
    /**
     * @description handles password changes
     */
    onPasswordInput(): void {
      this.$emit('passwordChanged', this.password)
    }
  }
}
</script>