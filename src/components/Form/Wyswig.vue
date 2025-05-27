<template>
  <div class="flex flex-col">
    <p v-if="label"
       class="font-bold text-black text-left mb-1"
    >
      <div class="flex justify-start">
        <span>
          {{ label }}
        </span>
        <AsteriskRequired v-if="required"
                          class="ml-1"
        />
      </div>
    </p>
    <div class="tinmce-wrapper">
      <Editor :init="wyswigConfig"
              v-model="value"
              ref="editor"
      />
    </div>
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
import 'tinymce/plugins/fullscreen';

/* content UI CSS is required */
import 'tinymce/skins/ui/oxide/content.js';

/* The default content CSS can be changed or replaced with appropriate CSS for the editor content. */
import 'tinymce/skins/content/default/content.js';

import AsteriskRequired from "@/components/Form/AsteriskRequired.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
      value: '',
      wyswigConfig: {
        height: 600,
        promotion: false,
        branding: false,
        fullscreen_native: true,
        skin: 'oxide',
        skin_url: 'default',
        plugins: 'lists link image table code lists fullscreen hr',
        /** @link https://www.tiny.cloud/docs/tinymce/latest/available-toolbar-buttons/ */
        toolbar1: "undo redo | blocks fontfamily fontsize | bold italic strikethrough underline | forecolor backcolor",
        toolbar2: "alignleft aligncenter alignright alignjustify  | outdent indent | numlist bullist | image link | code fullscreen | hr",
      }
    }
  },
  props: {
    label: {
      type: [String, null],
      required: false,
      default: null,
    },
    initialValue: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    AsteriskRequired,
    Editor
  },
  created(): void {
    this.value = this.initialValue;
  },
  methods: {
    /**
     * @description this works better than using v-model, because for some reason tinymce strips some tags randomly
     */
    getContent(): string {
      return this.$refs.editor.getEditor().getContent();
    }
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
  .tox-tinymce {
    border-width: 1px;
    @apply border-gray-600
  }

  @apply mb-6
}
</style>