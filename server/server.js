const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))

app.get('/', cors(), (req, res) => {
  res.setHeader('Content-Type', 'application/text'); 
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})