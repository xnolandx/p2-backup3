// const fs = require("fs");

// const express = require("express");
// const app = express();
// const port = 3001;
// const cors = require("cors");

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());

// const characters = JSON.parse(fs.readFileSync("Characters.JSON"));

// app.get("/", (req, res) => {
//   res.send("This is not the endpoint you're looking for");
// });

// app.get("/characters", (req, res) => {
//   const searchQuery = decodeURIComponent(req.query.search);
//   if (searchQuery !== "undefined") {
//     const filteredCharacters = characters.filter((character) =>
//       character.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     res.json(filteredCharacters);
//   } else {
//     res.json(characters);
//   }
// });
// app.get("/characters/:characterId", (req, res) =>
//   res.send(characters.find((movie) => movie.movieId === +req.params.movieId))
// );

// app.listen(port, () =>
//   console.log(`Example app listening at http://localhost:${port}`)
// );

// app.listen(2020, () => {
//   console.log('server is listening on port 2020');
// });


const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

const characters = JSON.parse(fs.readFileSync("Characters.JSON"));

app.get("/", (req, res) => {
  res.send("This is not the endpoint you're looking for");
});

app.get("/characters", (req, res) => {
  const searchQuery = decodeURIComponent(req.query.search);
  if (searchQuery !== "undefined") {
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    res.json(filteredCharacters);
  } else {
    res.json(characters);
  }
});
app.get("/characters/:characterId", (req, res) =>
  res.send(characters.find((movie) => movie.movieId === +req.params.movieId))
);

app.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({
        message: `Hello ${name}`
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});