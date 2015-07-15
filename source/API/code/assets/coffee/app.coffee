###!
# api.prabhatkumar.org® [v0.0.1]
# @author    : Prabhat Kumar [http://prabhatkumar.org/]
# @copyright : Prabhat Kumar [http://prabhatkumar.org/]
###



### @Invoking strict mode ###
'use strict'

### API server for api.prabhatkumar.org/ ###
http = require('http')
https = require('https')
fs = require('fs')
express = require('express')
passport = require('passport')
BasicStrategy = require('passport-http').BasicStrategy
forceSSL = require('express-force-ssl')
bodyParser = require('body-parser')
### API Server Options. ###
options = 
  key: fs.readFileSync('keys/api.key')
  cert: fs.readFileSync('keys/api_prabhatkumar_org.crt')

app = express()
module.exports = app

app.set 'config', require('./config')
# @passport.use
passport.use new BasicStrategy((username, password, done) ->
  config = app.get('config')
  if config.accounts
    i = 0
    while i < config.accounts.length
      account = config.accounts[i]
      if account.username == username and account.password == password
        return done(null, account)
      i++
  done null, false
)
# See:- http://blog.cloudflare.com/introducing-universal-ssl/
app.use (req, res, next) ->
  host = req.headers.host
  if host.slice(0, 4) != 'api.'
    return res.redirect('http://' + host + req.originalUrl)
  next()
  return
app.use forceSSL
app.use passport.initialize()
app.use bodyParser.urlencoded(extended: true)
require './routes/repository'
require './routes/status'
app.use '/axis', axis
# https.createServer(options, app).listen(443);
