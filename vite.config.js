/**
 * @description some important researches:
 *              - {@link https://stackoverflow.com/questions/69165942/rollupjs-function-is-being-called-before-definition-bundled-code} - stream
 */

/**
 * @description some notes about vite
 *              - prod compiled module should not contain `require` inside them, this might break things
 */

import { defineConfig }   from 'vite'
import vue                from '@vitejs/plugin-vue'
import VueI18nPlugin      from '@intlify/unplugin-vue-i18n/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path               from 'path'
import { nodePolyfills }  from 'vite-plugin-node-polyfills'
import timeReporter       from 'vite-plugin-time-reporter';
import { terser }         from 'rollup-plugin-terser';

export default defineConfig(({ command, mode, ssrBuild }) => {
    let isProduction = (mode === "production");

    return {
        build: {
            /**
             * @description set to false if You need to debug prod code
             *              Using this one because vite built in does not remove comments
             */
            minify: isProduction ? 'terser' : false,

            /**
             * @description DO NOT activate this, it's left here, so it's known that it causes issues with jsonwebtoken
             */
            // commonjsOptions: {
            //     transformMixedEsModules: true,
            // },
        },
        /**
         * This syntax "isProduction && obfuscator()" means -> execute this plugin only in production mode,
         */
        plugins: [
            /**
             * @description minifies and cleans up the code
             *
             * @link https://www.npmjs.com/package/@rollup/plugin-terser
             * @link https://www.npmjs.com/package/rollup-plugin-terser
             * @link https://github.com/terser/terser#minify-options
             */
            isProduction && terser({
                format: {
                    comments: false,
                },
                mangle: {
                    keep_classnames: false,
                },
            }),
            /**
             * @description https://www.npmjs.com/package/vite-plugin-time-reporter - shows building time
             */
            isProduction && timeReporter(),
            /**
             * @description this polyfills some node logic into browser executable code
             */
            nodePolyfills({
                // Whether to polyfill `node:` protocol imports.
                protocolImports: true
            }),
            vue(),
            /**
             * @description this solves some translation files based issues found during prod code compilation
             * {@link https://www.npmjs.com/package/@intlify/unplugin-vue-i18n}
             */
            isProduction && VueI18nPlugin({
                // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
                compositionOnly: true,
                include: [path.resolve(__dirname, './src/translations/**/**/**/**/**/**/*.json')],
                strictMessage: false,
            }),

            /**
             * @description this will force vite to export all the images to the dist/assets
             *              It's not used in here anywhere, but it just works.
             *
             *              It's made this way because in some cases the image paths (or other assets)
             *              are passed via props which vite won't resolve (any custom prop like :stuff-thing)
             *
             *              Because of this all the images need to be exported to the build folder, then
             *              there is some workaround for this to make the images resolve-able
             *
             *              This does create duplicated images because, if there is something like:
             *              - <img src=""> then vite knows how to resolve it and actually exported js file will use the
             *     default asset,
             *              - <component :prop> Vite doesn't care so the asset path will remain unchanged, thus the copy
             *     `dest` path will be used
             *
             *              Important here is that:
             *              - dest path = src path, that's a must
             */
            isProduction && viteStaticCopy({
                targets: [
                    {
                        src: 'src/assets/img',
                        dest: 'src/assets/'
                    }
                ]
            })
        ],
        /**
         * @description it literally replaces something in code with other thing. So calling "this":"that", will cause
         *              the output code to contain "that.method()" instead of "this.method()".
         */
        define: {
            'process.env': {
                ...process.env,
                // fixes for vite not working with `jsonwebtoken` package (used for whole user token validation logic)
                "NODE_DEBUG":  "'development'" // info: might need to be production or somehow depending on the dynamic mode change
            },
            // This is required for some stream_readable package (project won't work without it set here)
            'global.Uint8Array': Uint8Array,
            // that's required by some semver package, dunno what it is, it's some dependency of other packages
            'process.version': "'9.0.0'",
        },
        resolve: {
            dedupe: [
                // this solves the issue: "TypeError: Cannot read properties of null (reading 'isCE')" caused by npm module "vue3-tour"
                'vue',
            ],
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: {
                '@' : path.resolve(__dirname, './src'),

                // fixes for vite not working with `jsonwebtoken` package (used for whole user token validation logic)
                "stream" : require.resolve("stream-browserify"), // whenever the `require("stream") is called the "stream-browserify" get loaded instead
                "crypto" : require.resolve("crypto-browserify"), // whenever the `require("crypto") is called the "crypto-browserify" get loaded instead

                /**
                 * @description solves issues with jsonwebtoken
                 */
                "readable-stream" : "vite-compatible-readable-stream",
                /** @link https://github.com/liriliri/eruda */
                "eruda": isProduction ? path.resolve(__dirname, '/') + "./mock-npm-package.js" : require.resolve("eruda"),
            },
        },
        /**
         * @description configure vite hmr server connection (hot reload)
         */
        server: {
            host: true,
            port: 80, // port of the project inside the docker-container
            https: false,
            hmr:{
                clientPort: 4001, // port of the project on the pc, on which the website is reachable at
            },
        }
    }
})