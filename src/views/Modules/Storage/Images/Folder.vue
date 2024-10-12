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
import SingleFile from "@/views/Modules/Storage/Images/SingleFile.vue";

import {ComponentData} from "@/scripts/Vue/Types/Components/types";

import VueRouterStorage from "@/router/Modules/VueRouterStorage";

export default {
  data(): ComponentData {
    return {
      routeName: VueRouterStorage.ROUTE_NAME_STORAGE_IMAGES_FOLDER,
      dirsStructure: [
        {
          dirname: "Main folder",
          path: "/",
          files: [
            {
              name: "File with some strangely long name tho",
              dummyTempUrl: "https://m.media-amazon.com/images/I/51xAwzRMGSL._CR1,0,718,405_SR684,386_.jpg",
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
              dummyTempUrl: "https://m.media-amazon.com/images/I/51xAwzRMGSL._CR1,0,718,405_SR684,386_.jpg",
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
              dummyTempUrl: "https://m.media-amazon.com/images/I/51xAwzRMGSL._CR1,0,718,405_SR684,386_.jpg",
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
              dummyTempUrl: "https://m.media-amazon.com/images/I/51xAwzRMGSL._CR1,0,718,405_SR684,386_.jpg",
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
              dummyTempUrl: "https://m.media-amazon.com/images/I/51xAwzRMGSL._CR1,0,718,405_SR684,386_.jpg",
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
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
              ext: "jpge",
              size: "10kb",
              tags: [
                "game",
                "cheats"
              ]
            },
            {
              name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
              dummyTempUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/GUILD-WARS-2.jpg",
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
                      name: "This file name is insanely long trust me it's just for testing purpose, like for reall tho",
                      dummyTempUrl: "https://gaming-cdn.com/images/products/13397/screenshot/guild-wars-2-complete-collection-complete-collection-pc-game-ncsoft-wallpaper-1.jpg?v=1674726871",
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
    SingleFile,
    FolderBase
  },
}
</script>