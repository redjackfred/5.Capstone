import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;
const RESOURCE_TYPE = "Image";
const API_KEY = "2f8825b0-f0c3-46fa-b517-6b32b7d919a0";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.harvardartmuseums.org/${RESOURCE_TYPE}?apikey=${API_KEY}&q=width:>2000`
    );
    const imageURL =
      result.data.records[
        Math.floor(Math.random() * result.data.records.length)
      ].baseimageurl;

    res.render("index.ejs", { imageURL: imageURL });
  } catch (error) {
    console.log(error);
  }
});

app.get("/randomImage", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.harvardartmuseums.org/${RESOURCE_TYPE}?apikey=${API_KEY}&q=width:>1000`
    );
    const imageURL =
      result.data.records[
        Math.floor(Math.random() * result.data.records.length)
      ].baseimageurl;

      res.render("index.ejs", { imageURL: imageURL });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
