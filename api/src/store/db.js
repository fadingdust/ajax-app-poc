import low from'lowdb'
import fs from 'fs'
import path from 'path'
import FileSync from'lowdb/adapters/FileSync'
import clearbit from '../services/clearbit'

import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

//World's smallest JSON db:
const filePath=path.join(__dirname + '/../data/db.json')

const adapter = new FileSync(filePath)
const db = low(adapter)

//Setup: 1-time only
let dbFileInfo = fs.statSync(filePath)
if (dbFileInfo.size < 3) db.defaults({ icons: [] }).write()

//Initialize: 1-time only
if ( db.has('icons').value() && db.get('icons').value().length === 0 ) {
    // Add an icon
    db.get('icons')
      .push({ domain: 'default.com', url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=', added: new Date() }) // 1px png
      .write()
}

//Public Functions:
export default {
    logger: log,

    getIconByDomain: function(domain){
        return db.get('icons').find({ domain: domain }).value()
    },

    setIconByDomain: function(domain, url){
        const preExisting = this.getIconByDomain(domain);
        if (typeof preExisting == 'undefined' && typeof url == 'string') {
            db.get('icons')
              .push({ domain: domain, url: url, added: new Date() })
              .write()
        }

    }

}

