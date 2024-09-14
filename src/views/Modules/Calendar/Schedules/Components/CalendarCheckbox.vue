<template>
  <div class="calendar-item">
    <input type="checkbox"
           :id="id"
           :value="id"
           v-model="isChecked"
           :checked="isChecked"
           @change="onChange"
    >
    <label class="checkbox checkbox-calendar"
           :for="id"
    >{{ title }}</label>
  </div>
</template>

<script lang="ts">
import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      isChecked: true,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true,
    },
  },
  emits: [
    "calendarFilter"
  ],
  computed: {
    /**
     * @description return the color used for this calendar
     */
    usedColor(): string {
      return this.isChecked ? this.color : 'white';
    }
  },
  methods: {
    /**
     * @description react to user clicking on checkbox and changing it's state, emits event with calendar data
     */
    onChange(): void {
      this.$emit('calendarFilter', {id: this.id, isChecked: this.isChecked})
    },
    /**
     * @description the the checkbox checked programmatically && emit the change event as if it would've been normal click
     */
    setChecked(isChecked: boolean): void {
      this.isChecked = isChecked;
      this.onChange()
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-item *{
  @apply cursor-pointer hover:opacity-70
}

.checkbox-calendar::before {
  content: "";
  position: absolute;
  left: 7px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.checkbox.checkbox::before {
  background-color: v-bind(usedColor);
}

input[type="checkbox"]:not(.checkbox-all) {
  visibility: hidden;
}
</style>