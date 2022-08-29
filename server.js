const express = require('express');
const app = express();


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.listen(8085, () => {
  console.log("The server is up and running!");
});