const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();

const jsonPath = path.join(__dirname, "paintings.json");
let paintings;
fs.readFile(jsonPath, (err,data) => {
  if (err)
    console.log('Unable to read json data file');
  else
    paintings = JSON.parse(data);
});
  
app.get('/', (req,resp) => {resp.json(paintings) } );

app.get('/:id', (req,resp) => {
  const id = req.params.id;
  const mypainting = paintings.find(c=>c.id==id);
  if(mypainting) {
    resp.json(mypainting);
  }
  else {
    resp.status(404).json({error: 'Painting not found'})
  }
});

app.get('/gallery/:id', (req,resp) => {
  const galleryID = req.params.id;
  const mygallery = paintings.filter(obj => galleryID == obj.gallery.galleryID);
  resp.json(mygallery);
});

app.get('/artist/:id', (req,resp) => {
  const artistID = req.params.id;
  const myartist = paintings.filter(obj => artistID == obj.artist.artistID);
  resp.json(myartist);
});

app.get('/year/:min/:max', (req,resp) => {
    const minyear = req.params.min;
    const maxyear = req.params.max;
    const myyear = paintings.filter(obj => minyear <= obj.yearOfWork && maxyear >= obj.yearOfWork);
    resp.json(myyear);
});
let port = 8080;
app.listen(port,() => {
  console.log("Server running at port=" + port);
})
;
