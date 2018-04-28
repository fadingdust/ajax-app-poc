import axios from 'axios'
import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

let clearbit = {}
clearbit.logger = log;
clearbit.URI = 'https://logo.clearbit.com/'
clearbit.Service = {

  getFromAPI: function (requestedDomain) {
    return new Promise((resolve, reject) => {
        axios.get(clearbit.URI + requestedDomain, {
            params: { }
        })
        .then(function (response) {
            // not actually using the data, though I suppose I could convert it to data:base64..
            let responseData = { iconURL: clearbit.URI + requestedDomain, domain: requestedDomain }
            log.error({'service':'clearbit', 'url': clearbit.URI + requestedDomain }, responseData );    //[error.config.path, error.config.params, error.config.data] );   //Object.keys(error))
            resolve(responseData)
        })
        .catch(function (error) {  // https://github.com/axios/axios#handling-errors
            log.error({'service':'clearbit', 'url':error.config.url, 'path':error.config.path}, error.message );    //[error.config.path, error.config.params, error.config.data] );   //Object.keys(error))
            let responseData = { iconURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=', domain: requestedDomain , error: error.status}
            reject(responseData)
        })
    })
  }

}

export default clearbit
