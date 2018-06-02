const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors());

app.get('./grabdata', (req, resp) => {
    resp.json("Hello from the Server");
});

app.listen(4000, () => console.log("Listening on localhost 4000"))