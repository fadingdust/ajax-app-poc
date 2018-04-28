import axios from 'axios'
import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

let pwnd = {}
pwnd.logger = log;
pwnd.URI = 'https://haveibeenpwned.com/api/v2/breachedaccount/'
pwnd.Service = {

  getFromAPI: function (requestedEmail) {
    if(typeof requestedEmail == 'undefined') return { events: [], email: requestedEmail, error: (typeof requestedEmail) };
    return new Promise((resolve, reject) => {
        axios.get(pwnd.URI + requestedEmail, {
            params: {
            }
        })
        .then(function (response) {
            let responseData = { events: response.data, email: requestedEmail, error: false }
            resolve(responseData)
        })
        .catch(function (error) {
            log.error({'service':'haveibeenpwned', 'url':error.config.url, 'path':error.config.path}, error.message );    //[error.config.path, error.config.params, error.config.data] );   //Object.keys(error))
            reject(error)
        })
    })
  }

}

export default pwnd
