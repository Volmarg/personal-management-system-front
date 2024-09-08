<template>
  <Base :info-block-description="$t('notes.new.description')">

    <div class="flex justify-center">
      <div class="mt-6 md:w-1/2 lg:w-5/6 w-full flex flex-col">
        <h2 class="text-lg mb-10">{{ $t('notes.new.form.header') }}</h2>
        <FormInput type="text"
                   :model-value="form.name"
                   :label="$t('notes.new.form.title.label')"
        />

        <Wyswig v-model="form.body"
                :initial-value="initialBody"
        />

        <CategorySelect :label="$t('notes.new.form.category.label')" />

        <MediumButtonWithIcon :text="$t('notes.new.form.submit.label')"
                              button-extra-classes="pt-3 pb-3 sm:pt-1 sm:pb-1"
                              class="w-full mb-1 md:col-start-1 md:col-end-2 mt-6"
                              button-classes="w-full md:w-auto m-0-force"
                              text-classes="text-center w-full"
                              @button-click="onNewSubmit"
        />

      </div>
    </div>
  </Base>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import Wyswig               from "@/components/Form/Wyswig.vue";
import CategorySelect       from "@/views/Modules/Notes/Components/CategorySelect.vue";
import FormInput            from "@/components/Form/Input.vue";
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Base                 from "@/views/Modules/Base.vue";

export default {
  data(): ComponentData {
    return {
      initialBody: '<b>Body</b>',
      form: {
        title: '',
        body: '',
        category: '',
      },
    }
  },
  components: {
    MediumButtonWithIcon,
    CategorySelect,
    FormInput,
    Wyswig,
    Base,
  },
  methods: {
    /**
     * @description triggered when user submits the form, updates front and back
     */
    onNewSubmit(): void {
      //
    },
  }
}
</script>