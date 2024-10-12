<template>
  <FolderBase :dirs-structure="dirsStructure"
              :route-name="routeName"
              folder-content-classes="pl-6 pr-6 pt-6"
  >
    <template #singleFile="{fileData}">
      <SingleFile :file-data="fileData"/>
    </template>
  </FolderBase>
</template>

<script lang="ts">
import FolderBase from "@/views/Modules/Storage/Common/FolderBase.vue";
import SingleFile from "@/views/Modules/Storage/Files/SingleFile.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_FILES_FOLDER,
      dirsStructure: [
        {
          dirname: "Main folder",
          path: "/",
          files: [
            {
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "File with some strangely long name tho",
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
              name: "Other file",
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
              path: "/data/folder 1",
              children: [
                {
                  dirname: "A",
                  path: "/data/folder 1/A",
                  children: []
                },
                {
                  dirname: "B",
                  path: "/data/folder 1/B",
                  children: []
                },
                {
                  dirname: "c",
                  path: "/data/folder 1/c",
                  children: []
                }
              ]
            },
            {
              dirname: "Folder 2",
              path: "/data/folder 1",
              children: [
                {
                  dirname: "X",
                  path: "/data/folder 2/X",
                  files: [
                    {
                      name: "File in folder",
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
                  path: "/data/folder 2/Y",
                  children: []
                },
                {
                  dirname: "Z",
                  path: "/data/folder 2/Z",
                  children: [
                    {
                      dirname: "Z1",
                      path: "/data/folder 2/Z/Z1",
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
    FolderBase,
    SingleFile
  },
}
</script>