<template>
  <color-border-bar>

    <div class="grid grid-rows-1 grid-cols-2 custom-grid">
      <span>
        <la svg-icon-name="exclamation-circle-solid"
            color="rgb(59, 130, 246)"
            font-size="30"
            class="icon"
        />
      </span>

      <span v-if="!!text"
            v-html="text"
            class="text-left"
      ></span>

      <span>
        <slot></slot>
      </span>
    </div>

  </color-border-bar>
</template>

<script lang="ts">
import LineAwesome    from "@/components/Ui/Icons/LineAwesome.vue";
import ColorBorderBar from "@/components/Ui/Bar/ColorBorderBar.vue";

export default {
  name: "PageDescriptionBlock",
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