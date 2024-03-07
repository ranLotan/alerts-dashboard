const express = require('express')
const uuidv1 = require('uuidv1')
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const cors = require('cors')
const app = express()
const port = 3000
const sources = ['Server', 'Factory', 'Sensors', 'Logistics', 'Tests' ];

const corsOptions = {
  origin: 'http://localhost:4200'
}

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


app.use(cors(corsOptions))

app.get('/', cors(), (req, res) => {
  res.send(generateAlertObj());
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateAlertObj(){
  return {
    "name": lorem.generateWords(1),
    "description": lorem.generateWords(10),
    "severity": randomIntFromInterval(1, 10),
    "date": Date.now().toString(),
    "source": sources[randomIntFromInterval(0,4)],
    "alertId": uuidv1(),
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}