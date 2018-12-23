const express       = require('express'),
      session       = require('express-session'),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser'),
      nunjucks      = require('nunjucks'),
      app           = express(),
      port          = process.env.PORT || 3000,
      http          = require('http').Server(app),
      io            = require('socket.io')(http),
      Message       = require('./models/messageModel'),
      User          = require('./models/userModel'),
      routes        = require('./routes/routes'),
      sockets       = require('./routes/sockets');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LightWavenDb', { useNewUrlParser: true });

app.set('views', __dirname + '/views');
// app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: "v3ry53cr37", resave: false, saveUninitialized: true, cookie: { /* secure: true */ }}))
app.use(express.static(__dirname + '/static'));

nunjucks.configure('views', { autoescape: true, express: app });

routes(app); // register routes
sockets(app, io); // register sockets

http.listen(port, function() {
    console.log('Light Waven 1v1 server started on: ' + port);
});
