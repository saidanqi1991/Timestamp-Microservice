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

//My code
app.get("/api/:date?", function(req, res){
  const dateParam = req.params.date;
  let date;
  
  if(dateParam) {
    //test the format of dateParam (UNIX or ISO)
    if(/^\d{5,}/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    }else{
      date = new Date(dateParam);
    }
    if(isNaN(date.getTime())) {
      return res.json({error: "Invalid Date"});
    }
  } else {
    //return current time if date parameter is empty
    date = new Date();
  }

  res.json({
    unix: date.getTime(), 
    utc: date.toUTCString()
  });
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
