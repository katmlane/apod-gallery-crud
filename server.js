const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 3000;
const fetch = require("node-fetch");
require("dotenv").config();
const apodURL = "https://api.nasa.gov/planetary/apod?api_key=";

let db,
  dbConnectionStr = process.env.DB_STRING,
  // replace ... with a string representing the name of the database
  dbName = "apod-gallery",
  myCollection;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
    // replace ... with a string representing the name of the collection
    myCollection = db.collection("gallery");
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// process.env.PORT is so heroku can choose a port for our app
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port 3000`);
});

app.get("/", (req, res) => {
  myCollection
    // use .find to get elements from the database
    .find()
    .toArray()
    //   .then is for the result
    .then((data) => {
      // response.render defines the file that is going to render the ejs, and the object we are passing to ejs takes form of {key : value}
      //   res.render("index.ejs", { ...: ... });
      res.render("index.ejs", { pictures: data });
    })
    .catch((error) => console.error(error));
});

// replace ... with the route has the form of '/...'
app.post("/getObject", async (request, response) => {
  console.log(request.body);

  const res = await fetch(
    `${apodURL}${process.env.API_KEY}&date=${request.body.date}`
  );
  const data = await res.json();
  console.log(data);

  myCollection
    // // replace ... with what you want to insert into the database usually request.body
    // // to add individual fields it takes the form of {key: value , ...}
    .insertOne(data)
    .then((result) => {
      // replace ... with custom message for the post being run
      console.log("...");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

// replace ... with the route has the form of '/...'
app.put("/addGallery", (request, response) => {
  // first agrument is the filter which finds a specific document
  // takes form of {key : value, ...}
  // replace first ... with the key the key comes from what is defined in mongo
  // replace second ... with value which is usually request.body...
  myCollection
    .updateOne(
      { hdurl: request.body.hdurl },
      {
        // second argument defines what part of the object to change
        $set: {
          // takes the form of {key: value}
          // replace first ... with the key that will be updated same as the key in mongo
          // replace second ... with the new value usually request.body...
          favorite: true,
        },
      }
      // has optional third category for options
      //   ,{
      //     sort: {_id: -1},
      //     upsert: true
      // }
    )
    .then((result) => {
      // replace ... with server console log for successful put
      console.log("...");
      // replace ... with what message you are ending back to the client
      response.json("...");
    })
    .catch((error) => console.error(error));
});

app.put("/removeGallery", (request, response) => {
  // first agrument is the filter which finds a specific document
  // takes form of {key : value, ...}
  // replace first ... with the key the key comes from what is defined in mongo
  // replace second ... with value which is usually request.body...
  myCollection
    .updateOne(
      { hdurl: request.body.hdurl },
      {
        // second argument defines what part of the object to change
        $set: {
          // takes the form of {key: value}
          // replace first ... with the key that will be updated same as the key in mongo
          // replace second ... with the new value usually request.body...
          favorite: false,
        },
      }
      // has optional third category for options
      //   ,{
      //     sort: {_id: -1},
      //     upsert: true
      // }
    )
    .then((result) => {
      // replace ... with server console log for successful put
      console.log("...");
      // replace ... with what message you are ending back to the client
      response.json("...");
    })
    .catch((error) => console.error(error));
});
