import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import bunyan from 'bunyan'
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

const port = process.env.PORT ? process.env.PORT : 8088;

let app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // TODO: Use an env var
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.json())

app.use(require('./routes'))

// Startup
app.listen( port , () => {
    log.info('Awaiting requests on localhost:' + port)
})