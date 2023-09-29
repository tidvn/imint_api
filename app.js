const express = require("express");
const router_api = require("./routes/api");
require('dotenv').config()
const app = express();
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 200, 
}));
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));
app.use("/api/", router_api);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
 
