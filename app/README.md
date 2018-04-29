# Have I Been Hacked?

Front-End PWA for the ../api service.


## Features
* UI by [Vuetify](https://vuetifyjs.com/)
* Unit Tests via [Jest](https://facebook.github.io/jest/)
* End-to-End tests via Nightwatch

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

## How we got here:
```
$ npm install -g vue-cli
$ vue init vuetifyjs/pwa app
$ cd app
$ npm install
$ npm install -D @vue/cli-plugin-unit-jest
$ vue invoke unit-jest
$ npm install @babel/core
$ npm install @vue/cli-service
$ npm run dev
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
