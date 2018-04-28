import Vue from 'vue'
// import _ from 'lodash'

let pwnd = {}
pwnd.URI = 'https://haveibeenpwned.com/api/v2/breachedaccount/'
pwnd.Service = {

  getFromAPI (requestedEmail) {
    return new Promise((resolve, reject) => {
      Vue.http.get(pwnd.URI + requestedEmail)
        .then(response => {
          // if (typeof response.data !== 'object') reject(response)

          let responseData = { events: response.data, email: requestedEmail }
          resolve(responseData)
        })
        .catch(error => reject(error))
    })
  },

  getFromInitialState: function (requestedEmail) {
    let foundPosts = []
    const initialState = {}

    if (initialState.posts.length > 0) foundPosts = initialState.posts[requestedEmail]

    return foundPosts
  }

}

export default pwnd
