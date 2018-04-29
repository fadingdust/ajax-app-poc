# Vue-App

The backend api service for the ../app

## 3 steps to get up and running:

``` bash
# install dependencies
npm install

# serve at localhost:8088
npm run dev

# build into ./dist
npm run build

# serve the build at localhost:8088
npm run serve
```

## Features
* Uses [ExpressJS](https://expressjs.com/)
* Routes available:
```
/email/email@domain.com
/icon/domain.com
```


## Data Sources
* Hack Events are sourced from [haveibeenpwned.com](https://haveibeenpwned.com/)
* Icons are pulled from [ClearBit](https://clearbit.com/logo)
