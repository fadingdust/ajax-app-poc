import Vue from 'vue'

let appApi = {}
appApi.URI = 'http://localhost:8088'
appApi.Service = {

  getHacksFromAPI (requestedEmail) {
    return new Promise((resolve, reject) => {
      Vue.http.get(appApi.URI + '/email/' + requestedEmail)
        .then(response => {
          console.log('getHacksFromAPI:response: ', response.data)
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  getIconFromAPI (requestedDomain) {
    return new Promise((resolve, reject) => {
      Vue.http.get(appApi.URI + '/icon/' + requestedDomain)
        .then(response => {
          let thisURL = ''
          if (typeof response.body.icon !== 'undefined') thisURL = response.body.icon.url

          let responseData = { iconURL: thisURL, domain: requestedDomain }
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  }

}

export default appApi
