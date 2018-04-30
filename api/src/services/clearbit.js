import axios from 'axios'
import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

let clearbit = {}
// TODO: Use a responseModel
clearbit.logger = log;
clearbit.URI = 'https://logo.clearbit.com/'
clearbit.Service = {

  responseModel: { iconURL: '', domain: '' , error: { 'status': '', 'message': '', 'url': ''} }, // HINT: Never extend this at-will

  getFromAPI: function (requestedDomain) {
    return new Promise((resolve, reject) => {
        axios.get(clearbit.URI + requestedDomain, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            params: { },
        })
        .then(function (response) {
            // not actually using the data, though I suppose I could convert it to data:base64..
            let responseData = clearbit.Service.responseModel
            responseData.iconURL = clearbit.URI + requestedDomain
            responseData.domain = requestedDomain

            // log.error({'service':'clearbit', 'status': 'success'}, responseData )
            resolve(responseData)
        })
        .catch(function (error) {  // https://github.com/axios/axios#handling-errors
            let responseData = clearbit.Service.responseModel //{ iconURL: clearbit.URI + requestedDomain, domain: requestedDomain }
            responseData.iconURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII='
            responseData.domain = requestedDomain
            responseData.error.status = '' //error.response['status']
            responseData.error.message = error.message
            responseData.error.url = clearbit.URI + requestedDomain

            // log.error({'service':'clearbit', 'status': 'error'}, responseData )
            resolve(responseData)
        })
    })
  }

}

export default clearbit
