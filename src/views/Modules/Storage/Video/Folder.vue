<template>
  <FolderBase :dirs-structure="dirsStructure"
              :route-name="routeName"
  >
    <template #singleFile="{fileData}">
      <SingleFile :file-data="fileData"/>
    </template>
  </FolderBase>
</template>

<script lang="ts">
import FolderBase from "@/views/Modules/Storage/Common/FolderBase.vue";
import SingleFile from "@/views/Modules/Storage/Video/SingleFile.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_VIDEO_FOLDER,
      dirsStructure: [
        {
          dirname: "Main folder",
          isLocked: false,
          path: "/",
          files: [
            {
              name: "File with some strangely long name tho",
              dummyTempUrl: "http://personal-management-system.pl/upload/videos/OCLPiB1bGAOxTfSjNiZGNJG1dVqZch3c.mp4",
              ext: "jpge",
              size: "30Mb",
              tags: [
                "cookie",
                "candy",
                "sweets",
                "cheap",
                "favourite"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "http://personal-management-system.pl/upload/videos/26eoDNCCfsuctt1ag8iPXIJvzw7PJ8pS.mp4",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "http://personal-management-system.pl/upload/videos/26eoDNCCfsuctt1ag8iPXIJvzw7PJ8pS.mp4",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "http://personal-management-system.pl/upload/videos/26eoDNCCfsuctt1ag8iPXIJvzw7PJ8pS.mp4",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "http://personal-management-system.pl/upload/videos/26eoDNCCfsuctt1ag8iPXIJvzw7PJ8pS.mp4",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
          ],
          children: [
            {
              dirname: "Folder 1",
              isLocked: false,
              path: "/data/folder 1",
              children: [
                {
                  dirname: "A",
                  isLocked: true,
                  path: "/data/folder 1/A",
                  children: []
                },
                {
                  dirname: "B",
                  isLocked: false,
                  path: "/data/folder 1/B",
                  children: []
                },
                {
                  dirname: "c",
                  isLocked: false,
                  path: "/data/folder 1/c",
                  children: []
                }
              ]
            },
            {
              dirname: "Folder 2",
              isLocked: true,
              path: "/data/folder 1",
              children: [
                {
                  dirname: "X",
                  isLocked: true,
                  path: "/data/folder 2/X",
                  files: [
                    {
                      name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
                      dummyTempUrl: "http://personal-management-system.pl/upload/videos/G8ai9aOxd3GcZ1fVJ9BxrQeBvRhGYvLn.mp4",
                      ext: "pdf",
                      size: "130Mb",
                      tags: [
                        "important-stuff",
                      ]
                    },
                  ],
                  children: []
                },
                {
                  dirname: "Y",
                  isLocked: true,
                  path: "/data/folder 2/Y",
                  children: []
                },
                {
                  dirname: "Z",
                  isLocked: true,
                  path: "/data/folder 2/Z",
                  children: [
                    {
                      dirname: "Z1",
                      isLocked: false,
                      path: "/data/folder 2/z/Z1",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    }
  },
  components: {
    SingleFile,
    FolderBase
  },
}
</script>