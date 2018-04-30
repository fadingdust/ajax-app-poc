import axios from 'axios'
import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

let pwnd = {}
pwnd.logger = log;
pwnd.URI = 'https://haveibeenpwned.com/api/v2/breachedaccount/'
pwnd.Service = {

  responseModel: { events: '', email: '' , error: { 'status': '', 'message': '', 'url': ''} }, // HINT: Never extend this at-will

  getFromAPI: function (requestedEmail) {
    if(typeof requestedEmail == 'undefined') return { events: [], email: requestedEmail, error: (typeof requestedEmail) };
    return new Promise((resolve, reject) => {
        axios.get(pwnd.URI + requestedEmail, {
            params: {
            }
        })
        .then(function (response) {
            let responseData = pwnd.Service.responseModel
            responseData.events = response.data
            responseData.email = requestedEmail
            responseData.error = false
            log.info({'service':'haveibeenpwned', 'status': 'success'} ) // responseData
            resolve(responseData)
        })
        .catch(function (error) {
            let responseData = pwnd.Service.responseModel
            responseData.events = []
            responseData.email = requestedEmail

            if(error.response){
                responseData.error = { 'status': '', 'message': '', 'url': ''}  // seems this needs to be reset after being 'false' above?
                responseData.error.status = error.response.status
                responseData.error.message = (error.response.message + error.response.data)
                responseData.error.url = error.config.url
            }

            log.error({'service':'haveibeenpwned', 'status': 'error' }, responseData)
            resolve(responseData)
        })
    })
  }

}

export default pwnd
