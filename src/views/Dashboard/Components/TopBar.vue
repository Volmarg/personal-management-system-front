<template>
  <div class="flex flex-col md:flex-row gap-y-2 md:gap-y-0 mt-2 md:mt-0 justify-end">
    <div class="relative">
      <!-- widget size -->
      <MediumButtonWithIcon @button-click="isMenuOpen = true"
                            @menu-close="isMenuOpen=false"
                            :text="$t('dashboard.config.button.widgetSize.label')"
                            :margin-right-class-number="1"
                            class="w-full md:w-auto m-0-force"
                            button-classes="w-full md:w-auto calendar-view"
                            text-classes="text-center w-full"
      >
        <template #menu>
          <OnClickSmallMenu :is-menu-open="isMenuOpen">
            <Element @click="onWidgetSizeChange(1)">
              <p>{{ $t('dashboard.config.button.widgetSize.text.full') }}</p>
            </Element>
            <Element @click="onWidgetSizeChange(2)">
            <p>1/2</p>
            </Element>
          </OnClickSmallMenu>
        </template>

        <template #icon>
          <fa icon="list-alt" />
        </template>
      </MediumButtonWithIcon>
    </div>
  </div>
</template>

<script lang="ts">
import MediumButtonWithIcon from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import OnClickSmallMenu     from "@/components/Ui/Navigation/OnClickSmallMenu.vue";
import Element              from "@/components/Ui/Navigation/OnClickSmallMenu/Element.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import LocalStorageService from "@/scripts/Core/Services/Storage/LocalStorageService";

export default {
  data(): ComponentData {
    return {
      isMenuOpen: false,
    }
  },
  emits: [
    'widgetSizeChange',
  ],
  components: {
    Element,
    OnClickSmallMenu,
    MediumButtonWithIcon
  },
  methods: {
    /**
     * @description emit the size further and save conf in storage
     */
    onWidgetSizeChange(size: number): void {
      this.$emit('widgetSizeChange', size);
      LocalStorageService.set(LocalStorageService.DASHBOARD_WIDGET_SIZE, size);
    }
  }
}
</script>