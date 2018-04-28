import bunyan from 'bunyan'
import db from './store/db'
import cb from './services/clearbit'
import pwnd from './services/haveibeenpwnd'

const logger = bunyan.createLogger({name: "haveibeenhacked-server"});
const childLog = logger.child({ code_block: 'eventController'});

export default  {
    log: childLog,

    requestHackEvents: function(email_address, callback){
        const service = pwnd.Service.getFromAPI(email_address)
        service.then(result => {
            if( typeof result.events == 'object'){
                callback( result );

            }else{
                callback({ email: email_address, events: [], error: {'source':'eventController', error: typeof result.events } })
            }

        })
        .catch(error => {
            this.log.error({'service': 'eventController'}, error.message )

            callback({ email: email_address, events: [], error: {'source':'eventController', 'message': error.message } })
        })

    },


    requestLogo: function(domain, callback){
        const service = cb.Service.getFromAPI(domain)
        service.then(result => {
            callback(result)
        })
        .catch(error => {
            this.log.error({'service': 'eventController'}, error)

            callback(error)
        })

    }


}
