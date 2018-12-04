const express     = require('express'),
      mongoose    = require('mongoose'),
      bodyParser  = require('body-parser'),
      nunjucks    = require('nunjucks'),
      app         = express(),
      port        = process.env.PORT || 3000,
      Message     = require('./models/messageModel')
      routes      = require('./routes/routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LightWavenDb', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.set('views', './views');

nunjucks.configure('views', { autoescape: true, express: app});

routes(app); //register routes

app.listen(port);

console.log('Light Waven 1v1 server started on: ' + port);

