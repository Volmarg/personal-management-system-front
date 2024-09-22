<template>
  <!-- Idea is: left side folders structure, right side files in it, no list of dirs in menu-->
  <FolderBase :dirs-structure="dirsStructure" />
</template>

<script lang="ts">
import FolderBase from "@/views/Modules/Storage/Common/FolderBase.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

export default {
  data(): ComponentData {
    return {
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
                  path: "/data/folder 1/a",
                  children: []
                },
                {
                  dirname: "B",
                  path: "/data/folder 1/b",
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
                  path: "/data/folder 2/x",
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
                  path: "/data/folder 2/y",
                  children: []
                },
                {
                  dirname: "Z",
                  path: "/data/folder 2/z",
                  children: [
                    {
                      dirname: "Z1",
                      path: "/data/folder 2/z/z1",
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
    FolderBase
  },
}
</script>