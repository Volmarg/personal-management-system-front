<template>
  <color-border-bar border-color-class="border-orange-500">

    <div class="grid grid-rows-1 grid-cols-2 custom-grid w-full">
      <span>
        <la svg-icon-name="exclamation-triangle-solid"
            color="rgba(255, 98, 0, 0.56)"
            font-size="30"
            class="icon"
        />
      </span>

      <span v-html="text"
            v-if="!!text"
            class="text-left align-self-center"
      ></span>

      <slot></slot>
    </div>

  </color-border-bar>
</template>

<script lang="ts">
import LineAwesome    from "@/components/Ui/Icons/LineAwesome.vue";
import ColorBorderBar from "@/components/Ui/Bar/ColorBorderBar.vue";

export default {
  name: "WarningBlock",
  props: {
    text: {
      type     : String,
      required : false
    }
  },
  components: {
    "color-border-bar" : ColorBorderBar,
    "la"               : LineAwesome,
  }
}
</script>

<style lang="scss" scoped>
.custom-grid {
  grid-template-columns: 50px 1fr;
}

.icon {
  flex-direction: column;
  justify-content: center;
  display: flex;
}

</style>