const express = require("express");
const bodyParser = require("body-parser");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 8080;

const client = new OAuth2Client(process.env.CLIENT_ID);

app.post("/data", async (req, res) => {
  try {
    const token = req.body.tokenId;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const data = ticket.getPayload();
    res.status(201).send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
});

app.get("/show", (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Hello",
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
    });
  }
});

console.log("hello");

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
