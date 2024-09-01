<template>
  <div class="tinmce-wrapper">
    <Editor :init="wyswigConfig"
            v-model="value"
    />
  </div>
</template>

<script lang="ts">
/**
 * @link https://www.tiny.cloud/docs/tinymce/latest/
 * @link https://github.com/tinymce/tinymce-vue/issues/403#issuecomment-1898613308
 */
import 'tinymce'
import Editor from "@tinymce/tinymce-vue"

/* Required TinyMCE components */
import 'tinymce/icons/default/icons.min.js';
import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/models/dom/model.min.js';

/* Import a skin (can be a custom skin instead of the default) */
import 'tinymce/skins/ui/oxide/skin.js';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/image';

/* content UI CSS is required */
import 'tinymce/skins/ui/oxide/content.js';

/* The default content CSS can be changed or replaced with appropriate CSS for the editor content. */
import 'tinymce/skins/content/default/content.js';

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      value: '',
      wyswigConfig: {
        promotion: false,
        branding: false,
        skin: 'oxide',
        skin_url: 'default',
        plugins: 'lists link image table code',
        /** @link https://www.tiny.cloud/docs/tinymce/latest/available-toolbar-buttons/ */
        toolbar1: "undo redo | blocks fontfamily fontsize | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
        toolbar2: "image link | code",
      }
    }
  },
  props: {
    initialValue: {
      type: String,
      required: false,
      default: '',
    }
  },
  components: {
    // AsteriskRequired
    Editor
  },
  created(): void {
    this.value = this.initialValue;
  },
  watch: {
    value(): void {
      this.$emit('update:modelValue', this.value);
    }
  }
}
</script>

<style lang="scss">
.tinmce-wrapper {
  /* The height is VERY important, if it's set incorrect, the form elements near TinyMce get weirdly resized */
  height: 400px !important;

  .tox-tinymce {
    border-width: 1px;
    @apply border-gray-600
  }

  @apply mb-6
}
</style>