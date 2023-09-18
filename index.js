// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// API route to handle date conversion
app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  console.log('params', req.params)
  console.log('date', date)
  if (!date) {
    const currentUnixTimestamp = Date.now();
    const currentUtcDate = new Date(currentUnixTimestamp).toUTCString();
    return res.json({ unix: currentUnixTimestamp, utc: currentUtcDate });
  }
  const inputDate = isNaN(date) ? new Date(date) : new Date(parseInt(date));

  if (isNaN(inputDate.getTime())) {
    return res.json({ error: 'Invalid date' });
  }

  const unixTimestamp = inputDate.getTime();
  const utcDate = inputDate.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcDate });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
