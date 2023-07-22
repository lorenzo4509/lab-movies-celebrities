const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

// Ruta para mostrar el formulario de creación de celebridades
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});
router.post("/create", async (req, res) => {
    try {
      // Obtener los datos del formulario desde req.body
      const { name, occupation, catchPhrase } = req.body;
  
      // Crear una instancia del modelo de Celebrity con los datos del formulario
      const newCelebrity = new Celebrity({
        name,
        occupation,
        catchPhrase,
      });
  
      // Guardar la nueva celebridad en la base de datos
      await newCelebrity.save();
  
      // Redirigir a la página con la lista de celebridades (crearemos esta ruta en la siguiente iteración)
      res.redirect("/celebrities");
    } catch (error) {
      // Si hay un error, renderizar la vista del formulario nuevamente para que el usuario pueda corregirlo
      res.render("celebrities/new-celebrity", { error });
    }
  });
  
router.get("/", async (req, res) => {
    try {
      // Usa el método find() del modelo de Celebrity para recuperar todas las celebridades
      const celebrities = await Celebrity.find();
  
      // Renderiza la vista celebrities/celebrities.hbs y pasa la matriz de celebridades a la vista como una variable
      res.render("celebrities/celebrities", { celebrities });
    } catch (error) {
      // Si hay un error, atrápalo y muestra un mensaje de error
      console.error("Error al obtener las celebridades: ", error);
      res.status(500).send("Error al obtener las celebridades");
    }
  });


module.exports = router;
