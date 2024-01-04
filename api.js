var express = require('express');
var router = express.Router();
const Database = require("@replit/database");
const db = new Database();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false})
var localvotes = [121312310,0,0,0,0,0];
const sample = require('./people.json');
const url2 = process.env['url']
const { EmbedBuilder, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: url2 });


//db.set("votes", localvotes).then(() => {})
db.get("votes").then(value => { localvotes = value })

router.get('/', function(req, res) {
  res.json(localvotes)
});

router.get('/people', function(req, res) {
  res.json(sample)
});

router.post('/vote', jsonParser, function(req, res){
  console.log(req.body)
  var id = req.body.id
  var val = req.body.value
  if(!req.body.id || !req.body.value || id > 6 || id < 0){
     res.status(400)
     res.json({message: "Bad Request"});
   } else {
    if (val > 1 || val < -1){
      val = 0;
    }
    
  // index is the id[0,0]
  // value the votes[1,2]
    localvotes[id-1] += val
    console.log(localvotes)
    webhookClient.send({
      content: sample[id-1] + ": " + localvotes[id-1] + " votes!!" + "<@582301237744107530>" ,
      username: 'test',
      avatarURL: 'https://imgur.com/t/rock/ysCQkfG',
    });
    db.set("votes", localvotes).then(() => {
      res.status(200).json({message: "Success"})
    })
    
   }
});

module.exports = router;