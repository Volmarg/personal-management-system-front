<template>
  <div>

      <City :violations="violations.city"
            v-model="city"
      />

      <Zip v-model="zip"
           :violations="violations.zip"
      />

      <Street v-model="street"
              :violations="violations.street"
      />

      <HomeNumber :violations="violations.homeNumber"
                  v-model="homeNumber"
      />

    <!-- no v-model support, see the component for more information -->
      <Country :initial-value="user.countryCode"
               :violations="violations.country"
               @change="country = $event"
      />

    <br/>

  </div>
</template>

<script lang="ts">
import Zip        from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address/Zip.vue";
import City       from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address/City.vue";
import Street     from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address/Street.vue";
import Country    from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address/Country.vue";
import HomeNumber from "@/views/User/Settings/Views/BaseData/components/PersonalData/Address/HomeNumber.vue";

import {ComponentData, ComponentSetup, ComponentValidation} from "@/scripts/Vue/Types/Components/types";

import {
  required,
  numeric, helpers,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

import VuelidateHandler from "@/scripts/Vue/Mixins/VuelidateHandler.vue";

import {userStateStore} from "@/scripts/Vue/Store/UserState";
import {UserData}       from "@/scripts/Core/Types/UserData";

export default {
  setup: (): ComponentSetup => ({v$: useVuelidate()}),
  data(): ComponentData {
    return {
      country    : null as null | string,
      city       : null as null | string,
      homeNumber : null as null | string,
      zip        : null as null | string,
      street     : null as null | string,
      user       : null as UserData | null,
      violations: {
        zip        : [],
        homeNumber : [],
        street     : [],
        city       : [],
        country    : [],
      },
    }
  },
  validations(): ComponentValidation{
    return {
      zip: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      street: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      homeNumber: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      city: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      },
      country: {
        required: helpers.withMessage(this.$t('validations.required'), required),
      }
    }
  },
  mixins: [
    VuelidateHandler,
  ],
  components: {
    HomeNumber,
    Country,
    City,
    Street,
    Zip
  },
  methods: {
    /**
     * @description returns the data that gets persisted on backend
     */
    getPersistedData(): Record<string, string | number | null> {
      return {
        country    : this.country,
        city       : this.city,
        homeNumber : this.homeNumber,
        zip        : this.zip,
        street     : this.street,
      }
    },
    /**
     * @description validate the inputs / selects etc.
     *              returns bool as indication if there are some violations or not (true = OK),
     */
    isValid(): boolean {
      this.v$.$validate();

      this.violations = this.vuelidateErrorsToArrayOfViolationsForProperties(this.v$.$errors);
      return (0 === Object.keys(this.violations).length);
    },
  },
  created() {
    this.userStateStore = userStateStore();
    this.userStateStore.loadUserData()
    this.user = this.userStateStore.user

    this.country    = this.user.countryCode;
    this.city       = this.user.city;
    this.homeNumber = this.user.homeNumber;
    this.zip        = this.user.zip;
    this.street     = this.user.street;
  }
}
</script>