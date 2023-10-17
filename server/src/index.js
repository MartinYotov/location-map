const express = require("express");
const cors = require("cors");
const { getLayerData } = require("./controllers/layer.controller");

const app = express();
const port = 3000;

app.use(cors());

app.get("/mapLayer/:layerName", getLayerData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
