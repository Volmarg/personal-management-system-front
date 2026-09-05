<template>
  <div>

    <div class="lg:grid lg:grid-cols-12 gap-4 mt-6">
      <div class="col-start-1 col-end-5">
        <FormInput type="text"
                   v-model="form.type"
                   max-chars="15"
                   :is-required="true"
                   :label="$t('health.overview.tabs.doctors.modal.createEdit.form.contact.name.label')"
                   top-wrapper-classes=""
        />
      </div>

      <div class="col-start-5 col-end-11 mt-5 lg:mt-0">
        <FormInput type="text"
                   v-model="form.value"
                   max-chars="25"
                   :is-required="true"
                   :label="$t('health.overview.tabs.doctors.modal.createEdit.form.contact.value.label')"
                   top-wrapper-classes=""
        />
      </div>

      <!-- turn into button with label when on mobile -->
      <div class="bg-red-500 text-white button-base trash-button align-self-center col-start-11 col-end-13 mt-4 lg:mt-0"
           @click="$emit('onDelete', uuid)"
      >
          <fa icon="trash"
              class="trash-icon"
          />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import FormInput from "@/components/Form/Input.vue";

export default {
  data(): ComponentData {
    return {
      form: {
        type: "",
        value: "",
      },
      doctorAppointmentStore: null,
    }
  },
  props: {
    uuid: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    FormInput,
  },
  emits: [
    "change",
    "onDelete",
  ],
  methods: {

  },
  beforeMount(): void {
    this.form.type = this.type;
    this.form.value = this.value;
  },
  watch: {
    form: {
      deep: true,
      handler: function() {
        this.$emit('change', {
          uuid: this.uuid,
          type: this.form.type,
          value: this.form.value,
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-base {
  border-radius: 5px;

  &:hover {
    @apply cursor-pointer opacity-75
  }

  @apply p-2
}

.trash-button {
  .trash-icon {
    margin-left: 5px;
  }

  @apply w-full h-full text-center text-xl pt-3
}

</style>