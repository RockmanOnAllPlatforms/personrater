const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const url2 = process.env['url']
const { EmbedBuilder, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: url2 });
const sample = require('./people.json');


app.set('view engine', 'ejs')

//const Database = require("@replit/database")
//const db = new Database()
function getRandomInt(max) {
  let ran = Math.floor(Math.random() * max)
  if (ran == 0){
    return 1
  }
  return ran;
}
// https://www.youtube.com/@svviperpit7422/videos
async function ping(){
  //let people = `${sample[getRandomInt(Object.keys(sample).length)]} kissed ${sample[getRandomInt(Object.keys(sample).length)]} with ${getRandomInt(100)}% love`
  let people = `Hate is given to <@659830540236619825> for being a bitch`
  webhookClient.send({
    content: people ,
    username: 'Hate Bot',
    avatarURL: 'https://cdn.discordapp.com/attachments/900575780814348362/1186165043092525138/https3A2F2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.png?ex=65924148&is=657fcc48&hm=d639484b21646b560f8195e9f7866d93ad3286cf86587176dacc551b27dadf6a&',
  });
  setTimeout(ping, 1000)
};



app.get('/', (req, res) => {
  res.render('index', {
    data: ""
  })
});

var index = require('./api.js')

app.use("/api", index)

app.listen(3000, () => {
  console.log('server started');
});
