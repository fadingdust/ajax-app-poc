import Vue from 'vue'
// import _ from 'lodash'

let clearbit = {}
clearbit.URI = 'https://logo.clearbit.com/'
clearbit.Service = {

  getFromAPI (requestedDomain) {
    return new Promise((resolve, reject) => {
      Vue.http.get(clearbit.URI + requestedDomain)
        .then(response => {
          let responseData = { iconURL: clearbit.URI + requestedDomain, domain: requestedDomain }
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  }

}

export default clearbit
