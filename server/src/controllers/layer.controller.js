const layersData = require("../../data/layers-data");

const getLayerData = (req, res) => {
  try {
    const { layerName } = req.params;

    const data = layersData[layerName];

    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send(`Layer not found`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getLayerData,
};
