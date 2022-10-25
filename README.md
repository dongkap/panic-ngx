# satpol-ngx [![Actions Status](https://github.com/dongkap/satpol-ngx/workflows/Dongkap%20Webpack%20CI/badge.svg)](https://github.com/dongkap/satpol-ngx/actions/workflows/webpack.yml)
Dongkap | Web Application with Angular

```

   __| |   ___    _ __     __ _  | | __   __ _   _ __  
  / _` |  / _ \  | '_ \   / _` | | |/ /  / _` | | '_ \ 
 | (_| | | (_) | | | | | | (_| | |   <  | (_| | | |_) |
  \__,_|  \___/  |_| |_|  \__, | |_|\_\  \__,_| | .__/ 
                          |___/                 |_|    

```

## Features
A big thank you to [Akveo team](https://www.akveo.com?utm_campaign=services%20-%20akveo%20website%20-%20ngx_admin%20github%20readme&utm_source=ngx_admin&utm_medium=referral&utm_content=from_developers_made_by) for their contribution in building [ngx-admin](https://github.com/akveo/ngx-admin) with full feature support. :thumbsup:

## Environment setup
Make sure following software is installed on your PC.
* [NodeJS 12](https://nodejs.org/en/download/) or later
* [Angular CLI 12](https://www.npmjs.com/package/@angular/cli)
* [NPM 6](https://www.npmjs.com/package/npm) or later
* [Visual Studio Code](https://code.visualstudio.com/download)


## Compile & Test
* __Development__

  ```
  $ npm install
  $ npm run start:do-app
  ```
  or
  ```
  $ npm install
  $ npm run install:do-core
  $ npm run install:do-theme
  $ npm run install:do-shared
  $ npm run install:do-auth
  $ npm run install:do-extra
  $ npm run install:do-sys
  $ npm run start:do-mock
  $ npm run start:do-app
  ```

## Code Scaffolding

- copy source from [akveo](https://github.com/akveo/ngx-admin)

### 1.	Generate Project
```sh
$ ng new satpol-ngx --create-application=false --routing=false --style=scss --skipGit=true --commit=false -S --newProjectRoot=@dongkap
```

### 2.	Generate Application
```sh
$ ng generate application do-mock --routing=true --prefix=ngx --style=scss
$ ng generate library do-core --prefix=do
$ ng generate library do-theme --prefix=do
$ ng generate library do-shared --prefix=do
$ ng generate library do-auth --prefix=do
$ ng generate library do-extra --prefix=do
$ ng generate library do-sys --prefix=do
$ ng generate library do-panic --prefix=do
$ ng generate application do-app --routing=true --prefix=do --style=scss
```

### 3.	Config Library @dongkap/do-core, do-shared, do-auth, do-extra, do-sys
- change name angular.json `projects.do-xxx` to `@dongkap/do-xxx`
- create file *@dongkap/do-xxx/src/index.ts* `export * from './public-api';`
- change name *@dongkap/do-xxx/ng-package.json* `/dist/do-xxx` to `/dist/@dongkap/do-xxx`
- change name *@dongkap/do-xxx/package.json* at `"name": "do-xxx "` to `"name": "@dongkap/do-xxx"`
- adjust *tsconfig.json*
- adjust *tsconfig.lib.json*
- adjust *tsconfig.lib.prod.json*
- adjust *tsconfig.spec.json*

### 4.	Config Library @dongkap/do-theme
- change name angular.json `projects.do-theme` to `@dongkap/do-theme`
- create file *@dongkap/do-theme/src/index.ts* `export * from './public-api';`
- change name *@dongkap/do-theme/ng-package.json* `/dist/do-theme` to `/dist/@dongkap/do-theme`
- change name *@dongkap/do-theme/package.json* at `"name": "do-theme "` to `"name": "@dongkap/do-theme"`
- adjust *tsconfig.json*
- adjust *tsconfig.lib.json*
- adjust *tsconfig.lib.prod.json*
- adjust *tsconfig.spec.json*
- copy from [akveo](https://github.com/akveo/ngx-admin) *@theme/components* to *@dongkap/do-theme/src/lib*
- copy from [akveo](https://github.com/akveo/ngx-admin) *@theme/directives* to *@dongkap/do-theme/src/lib*
- copy from [akveo](https://github.com/akveo/ngx-admin) *@theme/layouts* to *@dongkap/do-theme/src/lib*
- copy from [akveo](https://github.com/akveo/ngx-admin) *@theme/pipes* to *@dongkap/do-theme/src/lib*
- copy from [akveo](https://github.com/akveo/ngx-admin) *@theme/styles* to *@dongkap/do-theme/src/lib*
- copy from [akveo](https://github.com/akveo/ngx-admin) *src/app/@core/utils/analytics.service.ts* to *@dongkap/do-theme/src/lib/services*
- copy from [akveo](https://github.com/akveo/ngx-admin) *src/app/@core/utils/layout.service.ts* to *@dongkap/do-theme/src/lib/services*
- copy from [akveo](https://github.com/akveo/ngx-admin) *src/app/@core/utils/seo.service.ts* to *@dongkap/do-theme/src/lib/services*
- copy from [akveo](https://github.com/akveo/ngx-admin) *src/app/@core/utils/state.service.ts* to *@dongkap/do-theme/src/lib/services*
- `mkdir @dongkap/do-theme/src/styles`
- copy `@dongkap/do-theme/src/lib/styles/*.scss` to `@dongkap/do-theme/src/styles`
- copy `opensans.css`, `fonts/*` from [master](https://github.com/ridlafadilah/do-ngx/tree/master/%40dongkap/do-theme/src/styles)
- change in *@dongkap/do-theme/src/styles/syles.scss*  `@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');` to `@import 'opensans.css';`
- delete `@dongkap/do-theme/src/lib/components/tiny-mce`
- adjust *do-theme.module.ts*
- change `@dongkap/do-theme/src/lib/layouts/*.scss` `@import '../../styles/themes';` to `@import '../../../styles/themes';`
- change `@dongkap/do-theme/src/lib/components/*.scss` `@import '../../styles/themes';` to `@import '../../../styles/themes';`
- delete in *@dongkap/do-theme/src/styles/theme.scss* `@import '~@nebular/theme/styles/themes';`
- add in *@dongkap/do-theme/src/styles/theme.scss* `@import '~@nebular/theme/styles/themes/default';`
- add in *@dongkap/do-theme/src/styles/theme.scss* `@import '~@nebular/theme/styles/themes/dark';`
- add in *@dongkap/do-theme/src/styles/theme.scss* `@import '~@nebular/theme/styles/themes/cosmic';`
- add in *@dongkap/do-theme/src/styles/theme.scss* `@import '~@nebular/theme/styles/themes/corporate';`
- delete *@dongkap/do-theme/src/lib/components/index.ts*
- delete *@dongkap/do-theme/src/lib/layouts/index.ts*
- delete *@dongkap/do-theme/src/lib/pipes/index.ts*
- change angular.json `src/app/@theme/styles/styles.scss` to `node_modules/@dongkap/do-theme/styles/styles.scss`
- add angular.json `node_modules/flag-icon-css/css/flag-icon.min.css`

### 5.	Restructure Template @dongkap/do-mock
- change name angular.json `projects.do-mock` to `@dongkap/do-mock`
- adjust *tsconfig.app.json*
- adjust *tsconfig.spec.json*
- copy from [akveo](https://github.com/akveo/ngx-admin) *src/app* to *@dongkap/do-mock/src/app*
- change `@dongkap/do-mock/src/lib/pages/dashboard/rooms/rooms.component.scss` `../../../../assets/images/square_pattern.svg';` to `/assets/images/square_pattern.svg`
- change `@dongkap/do-mock/src/lib/pages/dashboard/rooms/rooms.component.scss` `../../../../assets/images/square_pattern_cosmic.svg';` to `/assets/images/square_pattern_cosmic.svg`
- delete *src/app/@mock/pages/editors*
- remove routing and menu editors

### 6.	Restructure Template @dongkap/do-app
- change name angular.json `projects.do-app` to `@dongkap/do-app`
- adjust *tsconfig.app.json*
- adjust *tsconfig.spec.json*
