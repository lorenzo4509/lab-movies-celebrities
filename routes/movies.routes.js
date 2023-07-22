const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// Iteración #6: Agregar nuevas películas
router.get("/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities });
  } catch (error) {
    console.error("Error al obtener las celebridades: ", error);
    res.status(500).send("Error al obtener las celebridades");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const newMovie = new Movie({
      title,
      genre,
      plot,
      cast,
    });
    await newMovie.save();
    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie", { error });
  }
});

// Iteración #7: Listado de nuestras películas
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.error("Error al obtener las películas: ", error);
    res.status(500).send("Error al obtener las películas");
  }
});

// Iteración #8: La página de detalles de la película
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.error("Error al obtener los detalles de la película: ", error);
    res.status(500).send("Error al obtener los detalles de la película");
  }
});

// Iteración #9: Eliminación de películas
router.post("/:id/delete", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.error("Error al eliminar la película: ", error);
    res.status(500).send("Error al eliminar la película");
  }
});

// Iteración #10: Edición de películas
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    console.error("Error al obtener los detalles de la película: ", error);
    res.status(500).send("Error al obtener los detalles de la película");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/movies/${req.params.id}`);
  } catch (error) {
    console.error("Error al actualizar la película: ", error);
    res.status(500).send("Error al actualizar la película");
  }
});

module.exports = router;
