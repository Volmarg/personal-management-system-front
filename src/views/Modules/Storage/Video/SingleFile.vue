<template>
  <FileBase :file-data="fileData"
            :select-on-file-representation-click="false"
            module-name="files"
            class="single-file"
  >
    <template #fileRepresentation>
      <VideoPlayer
          class="video-player vjs-big-play-centered"
          :src="fileData.dummyTempUrl"
          playsinline
          controls
          :fullscreen="true"
          :volume="0.6"
          :height="250"
          :width="400"
        />
    </template>
  </FileBase>
</template>

<script lang="ts">
import FileBase        from "@/views/Modules/Storage/Common/FileBase.vue";
import { VideoPlayer } from '@videojs-player/vue'

export default {
  components: {
    FileBase,
    VideoPlayer
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.single-file {
  $height: 400px;
  max-height: $height;
}
</style>

<style lang="scss">
@import 'video.js/dist/video-js.css';
//

.single-file {
  @apply cursor-pointer flex flex-col
}

.selected .file-icon {
  --fill: rgb(59, 130, 246) !important;
}

.file-name-wrapper-files {
  max-width: 100px;
}

// fix for missing icons in the player
// https://github.com/surmon-china/videojs-player/issues/176
.vjs-icon-play, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control .vjs-icon-placeholder, .vjs-icon-fullscreen-enter, .video-js .vjs-fullscreen-control .vjs-icon-placeholder, .vjs-icon-volume-high, .video-js .vjs-mute-control .vjs-icon-placeholder {
  font-family: VideoJS !important;
  font-weight: normal;
  font-style: normal;
}
</style>