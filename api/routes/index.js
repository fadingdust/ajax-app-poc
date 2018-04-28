import bunyan from 'bunyan'
import db from '../store/db'
import eventController from '../eventController'

const pathPrefix = '/api';

const router = require('express').Router();
const log = bunyan.createLogger({name: "haveibeenhacked-server"});

router.use(function(req, res, next) {
    req.log = log.child({ path : req.path, params: req.params });
    next();
});

router.get(pathPrefix+'/',  function(req, res, next) {
    res.send('<html><h2>Welcome to my laboratory!</h2></html>')
})

// These 2 icon routes are available as a wrapper for clearbit; prefer a blank icon instead of a 404.
router.get(pathPrefix+'/icon', (req, res, next) => {
    eventController.requestLogo('default.com', function(result){
        res.json(result)
    });
})

router.get(pathPrefix+'/icon/:domain', (req, res, next) => {
    eventController.requestLogo(req.params.domain, function(result){
        res.json(result)
    });
})

router.get(pathPrefix+'/email/:email_address', (req, res, next) => {
    eventController.requestHackEvents(req.params.email_address, function(result){
        res.json(result)
    });
})

module.exports = router;

