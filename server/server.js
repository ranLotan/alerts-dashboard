const express = require('express')
const uuidv1 = require('uuidv1')
const cors = require('cors')
const app = express()
const port = 3000

const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))

app.get('/', cors(), (req, res) => {
  res.send(generateAlertObj());
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function generateAlertObj(){
  return {
    "name": "testy",
    "description": "cupidatat adipisicing enim proident et do commodo",
    "severity": randomIntFromInterval(1, 10),
    "date": Date.now().toString(),
    "source": "nostrud",
    "alertId": uuidv1(),
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}