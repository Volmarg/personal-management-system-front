<template>
  <div v-tippy="$t('views.navbar.topBar.userMenu.timer.timeLeft.tippyMessage')"
       class="mr-3"
  >
    <la font-size="40"
        svg-icon-name="clock-solid"
    />

    <span class="countdown">
      {{ displayedString }}
    </span>

  </div>

  <SessionTimeWarningModal
      :is-visible="canSeeSessionTimeWarning()"
      @modal-closed="onTimeWarningClosed"
      @confirmed="onTimeWarningConfirmed"
      class="z-30"
  />
</template>

<script lang="ts">
import LineAwesome             from "@/components/Ui/Icons/LineAwesome.vue";
import SessionTimeWarningModal from "@/components/LoggedIn/System/SessionTimeWarningModal.vue";

import JwtService                         from "@/scripts/Core/Services/Security/JwtService";
import LocalStorageService                from "@/scripts/Core/Services/Storage/LocalStorageService";
import JwtTokenHandler                    from "@/scripts/Core/Security/JwtTokenHandler";
import StringTypeProcessor                from "@/scripts/Core/Services/TypesProcessors/StringTypeProcessor";

import moment          from "moment";
import {ComponentData} from "@/scripts/Vue/Types/Components/types";
import {ToastTypeEnum} from "@/scripts/Libs/ToastNotification";

export default {
  data(): ComponentData {
    return {
      canShowSessionWarningModal: false,
      isSessionTimeWarningVisible: false,
      secondsWarningDialogThreshold: 300, // 5 min
      secondsLeft     : null,
      timeLefStamp    : null,
      displayedString : null,
      timeInterval    : null,
    }
  },
  components: {
    "la" : LineAwesome,
    SessionTimeWarningModal
  },
  methods: {
    /**
     * @description check if conditions to show the time-left warning dialog are meet
     */
    canSeeSessionTimeWarning(): boolean {
      return (
              this.isSessionTimeWarningVisible
          &&  !LocalStorageService.isSet(LocalStorageService.getTimeRefreshStorageKey(), true)
      );
    },
    /**
     * @description calculates the `stamp` of how much time is left, this is then used by `momentjs` to
     *              nicely format the time left as "HH:mm"
     */
    getTimeLeftStamp(): number {
      let jwtService = new JwtService();
      let jwtString  = LocalStorageService.get(LocalStorageService.AUTHENTICATION_TOKEN);

      // 99% chance that user is now logged out
      if (StringTypeProcessor.isEmptyString(jwtString)) {
        if (!StringTypeProcessor.isEmptyString(this.timeInterval)) {
          clearInterval(this.timeInterval);
        }

        return 0;
      }

      let payload = jwtService.decodeUsingSignature(jwtString, true, false);
      if (null === payload) {
        /**
         * Don't throw exception here, it happens that token is invalidated and timer
         * still ticks, so payload can't be extracted from it. If we have jwt token here then
         * either something is wrong with key or it's expired.
         */
        if (!StringTypeProcessor.isEmptyString(this.timeInterval)) {
          clearInterval(this.timeInterval);
        }

        this.$rootEvent.showNotification(ToastTypeEnum.info, this.$t('messages.sessionExpired'));

        return 0;
      }

      let expirationMoment = jwtService.getExpirationTimeFromPayload(payload);
      let now              = moment();

      return expirationMoment.diff(now);
    },
    /**
     * @description will return the string that is displayed next to the clock
     */
    buildDisplayedString(): string {
      let momentDuration = moment.duration(this.timeLefStamp);
      let seconds        = momentDuration.seconds().toString();
      if (momentDuration.seconds() < 10 && momentDuration.seconds() >= 0) {
        seconds = `0${seconds}`;
      }

      let displayedData  = `${momentDuration.minutes()}:${seconds}`;

      return displayedData;
    },
    /**
     * @description will refresh the time left and logs user out if he runs out of time
     */
    controlTimeLeft(): void {
      this.timeInterval = setInterval(() => {
        this.handleTimeLeftWarning();

        this.timeLefStamp = this.getTimeLeftStamp();

        let momentDuration = moment.duration(this.timeLefStamp);
        this.secondsLeft   = momentDuration.minutes() * 60 + momentDuration.seconds();

        if (this.timeLefStamp <= 0) {
          this.$rootEvent.showFullPageLoader();
          (new JwtTokenHandler()).invalidateTokenAndRedirectUser();
          this.displayedString = 0;
          return;
        }

        this.displayedString = this.buildDisplayedString();
      }, 1000);
    },
    /**
     * @description check how much time is left and show the warning dialog
     *              - controls the dialog visibility
     */
    handleTimeLeftWarning(): void {
      if (this.canSeeSessionTimeWarning()) {
        return;
      }

      if (
              null !== this.secondsLeft
          &&  this.secondsLeft < this.secondsWarningDialogThreshold
      ) {
        this.isSessionTimeWarningVisible = true;
      }
    },
    /**
     * @description handle time warning modal getting closed,
     *              - sets the local storage key to mark given auth token as already handled (refreshed token is different)
     */
    onTimeWarningClosed(): void {
      this.isSessionTimeWarningVisible = false
      LocalStorageService.set(LocalStorageService.getTimeRefreshStorageKey(), "0");
    },
    /**
     * @description handle time warning modal confirmation,,
     *              - sets the local storage key to mark given auth token as already handled (refreshed token is different)
     */
    onTimeWarningConfirmed(): void {
      this.isSessionTimeWarningVisible = false
      LocalStorageService.set(LocalStorageService.getTimeRefreshStorageKey(), "1");
    },
  },
  created() {
    this.timeLefStamp   = this.getTimeLeftStamp();
    this.displayedString = this.buildDisplayedString();
    this.controlTimeLeft();
  },
  unmounted(): void {
    /**
     * @description Need to kill the interval otherwise it keeps counting, and causes redirects for example:
     *              - when banning user and moving him on landing page
     */
    if (null !== this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  }
}
</script>