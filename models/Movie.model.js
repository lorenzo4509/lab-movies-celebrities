
const mongoose = require("mongoose");

// Define el esquema del modelo de Movie
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

// Crea y exporta el modelo de Movie
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
