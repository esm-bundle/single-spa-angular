import url from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createEs2015LinkerPlugin } from '@angular/compiler-cli/linker/babel';
import {
  ConsoleLogger,
  NodeJSFileSystem,
  LogLevel,
} from '@angular/compiler-cli';

const __dirname = new url.URL('.', import.meta.url).pathname;
const require = createRequire(import.meta.url);

const packageJson = require('single-spa-angular/package.json');

/** File system used by the Angular linker plugin. */
const fileSystem = new NodeJSFileSystem();
/** Logger used by the Angular linker plugin. */
const logger = new ConsoleLogger(LogLevel.info);
/**
 * The linker plugin is used to make output files AOT compatible, so they don't
 * require the `@angular/compiler` at runtime.
 */
const linkerPlugin = createEs2015LinkerPlugin({
  fileSystem,
  logger,
  linkerJitMode: false,
});

const packages = ['2022']
  .map((ecma) => [
    {
      ecma,
      angularPackage: 'single-spa-angular/internals',
      filename: 'single-spa-angular-internals',
    },
    {
      ecma,
      angularPackage: 'single-spa-angular',
      filename: 'single-spa-angular',
    },
    {
      ecma,
      angularPackage: 'single-spa-angular/elements',
      filename: 'single-spa-angular-elements',
    },
    {
      ecma,
      angularPackage: 'single-spa-angular/parcel',
      filename: 'single-spa-angular-parcel',
    },
  ])
  .flat();

export default packages
  .map(({ ecma, angularPackage, filename }) => [
    createConfig({
      ecma,
      prod: false,
      format: 'system',
      angularPackage,
      filename,
    }),
    createConfig({
      ecma,
      prod: true,
      format: 'system',
      angularPackage,
      filename,
    }),
    createConfig({ ecma, prod: false, format: 'es', angularPackage, filename }),
    createConfig({ ecma, prod: true, format: 'es', angularPackage, filename }),
  ])
  .flat();

function createConfig({ ecma, prod, format, angularPackage, filename }) {
  const dir = (format === 'es' ? '.' : format) + `/es${ecma}`;

  return {
    input: path.join(
      __dirname,
      `node_modules/single-spa-angular/fesm${ecma}/${filename}.mjs`,
    ),
    output: {
      file: `${dir}/${filename}.${prod ? 'min.' : ''}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - ${angularPackage}@${packageJson.version} - ${format} format - es${ecma} - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      nodeResolve({ browser: true }),
      babel({ plugins: [linkerPlugin] }),
      prod &&
        terser({
          format: {
            ecma,
            comments: /esm-bundle/,
          },
          compress: {
            global_defs: {
              ngJitMode: false,
              ngDevMode: false,
              ngI18nClosureMode: false,
            },
          },
        }),
    ],
    external: [
      'rxjs',
      'rxjs/operators',
      '@angular/core',
      '@angular/common',
      'single-spa-angular/internals',
    ],
  };
}
