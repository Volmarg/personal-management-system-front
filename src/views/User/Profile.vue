<template>
  <container>

    <row :is-content-centered="true">
      <medium-button-with-icon  :text="$t('views.profile.panels.settings.title')"
                                :is-icon-on-top="true"
                                @click="importActiveVueComponent(selectableComponents.profileSettings)"
      >
        <template #icon>
          <icon-svg-cog/>
        </template>
      </medium-button-with-icon>

      <medium-button-with-icon  :text="$t('views.profile.panels.personalData.title')"
                                :is-icon-on-top="true"
                                @click="showDetailsModal()"
      >
        <template #icon>
          <icon-svg-person/>
        </template>
      </medium-button-with-icon>

    </row>

    <div>
      <transitioned-component :is-visible="isComponentVisible"
                              :component="selectedVueComponent"
      />
    </div>

  </container>

  <personal-data-modal :is-visible="isDetailModalVisible"
                       @modal-closed="hideDetailsModal()"
  />
</template>

<script lang="ts">

import IconSvgPerson          from "@/components/Ui/Icons/Svg/Person.vue";
import IconSvgCog             from "@/components/Ui/Icons/Svg/Cog.vue";

import PersonalDataModal      from "@/components/LoggedIn/User/PersonalDataModal.vue";
import Row                    from "@/components/Ui/Row.vue";
import MediumButtonWithIcon   from "@/components/Navigation/Button/MediumButtonWithIcon.vue";
import Container              from "@/components/Ui/Containers/Container.vue";
import BaseError              from "@/scripts/Core/Error/BaseError";
import {readonly, shallowRef} from "vue";
import {ComponentData}        from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return{
      isDetailModalVisible: false,
      selectedVueComponent: null,
      nameOfInitiallySelectedComponent: 'profileSettings',
      selectableComponents: readonly({
        profileSettings : "profileSettings",
      })
    }
  },
  components: {
    "personal-data-modal"     : PersonalDataModal,
    "medium-button-with-icon" : MediumButtonWithIcon,
    "container"               : Container,
    "icon-svg-person"         : IconSvgPerson,
    "icon-svg-cog"            : IconSvgCog,
    "row"                     : Row,
  },
  computed: {
    /**
     * @description will check if the component should be visible or not
     */
    isComponentVisible(): boolean {
      return null !== this.selectedVueComponent;
    }
  },
  methods: {
    /**
     * @description will set the active component based on selection
     */
    importActiveVueComponent(selectedComponentName: string): void {
        if(selectedComponentName === this.selectableComponents.profileSettings){

          import("@/views/User/Profile/Settings.vue").then(component => {
            this.selectedVueComponent = shallowRef(component.default);
          })
        }else{
          throw new BaseError("Unsupported component for user profile. Got: " + this.selectedComponent);
        }
    },
    /**
     * @description will show the user details dialog
     */
    showDetailsModal(): void {
      this.isDetailModalVisible = true;
    },
    /**
     * @description will hide the user details dialog
     */
    hideDetailsModal(): void {
      this.isDetailModalVisible = false;
    }
  },
  beforeMount(): void {
    // import initial component
    this.importActiveVueComponent(this.nameOfInitiallySelectedComponent);
  }
}
</script>