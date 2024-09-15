var express = require("express");
var cors = require("cors");
const axios = require("axios");

var app = express();

app.use(cors());

const urlPrev =
  "https://intranet.portodesantos.com.br/_json/porto_hoje.asp?tipo=programados2";

const urlCheg =
  "https://intranet.portodesantos.com.br/_json/porto_hoje.asp?tipo=fundeados";

function getPrevData() {
  return axios
    .get(urlPrev)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error making API call:", error);
      return { error: "Error retrieving port data" };
    });
}

function getChegData() {
  return axios
    .get(urlCheg)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error making API call:", error);
      return { error: "Error retrieving port data" };
    });
}

app.get("/prev", async (req, res) => {
  try {
    const PORTDATA = await getPrevData();
    res.json(PORTDATA);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve port data" });
  }
});

app.get("/cheg", async (req, res) => {
  try {
    const CHEGDATA = await getChegData();
    res.json(CHEGDATA);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve port data" });
  }
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
