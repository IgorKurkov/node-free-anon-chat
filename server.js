var express  = require("express"),
    favicon  = require('serve-favicon'),
    app      = express(),
    port     = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path       = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Chatdb');
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/chatRoutes');
routes(app);

app.use(express.static(__dirname + '/public'));
app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.use(favicon(path.join(__dirname,'public', 'favicon.ico')));

app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
});

app.listen(port);

console.log('chat app server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

