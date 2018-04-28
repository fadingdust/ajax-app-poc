import Vue from 'vue'

let appApi = {}
appApi.URI = 'https://beenhacked.mwallace.info/api'
appApi.Service = {

  getHacksFromAPI (requestedEmail) {
    return new Promise((resolve, reject) => {
      Vue.http.get(appApi.URI + '/email/' + requestedEmail)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getIconFromAPI (requestedDomain) {
    return new Promise((resolve, reject) => {
      Vue.http.get(appApi.URI + '/icon/' + requestedDomain)
        .then(response => {
          let thisURL = ''
          if (typeof response.body.iconURL !== 'undefined') thisURL = response.body.iconURL

          let responseData = { iconURL: thisURL, domain: requestedDomain }
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  }

}

export default appApi
