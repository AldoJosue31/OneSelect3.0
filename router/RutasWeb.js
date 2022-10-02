const express = require('express');
const router = express.Router();
var versionG = "2.5";
var desarrolladorG = "Aldo";


router.get("/", (req, res) => {
  const marcas = [
    "Modelo especial",
"Modelo negra",
"Modelo malta",
"Corona extra",
"Corona cero",
"Corona agua rifada",
"Corona light",
"Victoria",
"Victoria chelada",
"Victoria mango",
"Victoria chamoy",
"Victoria cempasúchil",
"Bud light",
"Pacifico suave",
"Pacifico clara",
"Ultra",
"Ultra sabor",
"Barrilito"
  ]
  res.render("index", { version: versionG, desarrollador: desarrolladorG, marcas: marcas}
     
      );
    });
  
  router.get("/registros", (req, res) => {
      res.render("registros", { version: versionG, desarrollador: desarrolladorG});
      
  });
  
  router.get("/covid", (req, res) => {
    res.render("covid", { version: versionG, desarrollador: desarrolladorG});
  });

  router.get("/productos", (req, res) => {
    res.render("productos", { version: versionG, desarrollador: desarrolladorG});
  });
  
  router.get("/importes", (req, res) => {
    res.render("importes", { version: versionG, desarrollador: desarrolladorG});
  });
  
  router.get("/acerca-de", (req, res) => {
    res.render("acerca-de", { version: versionG, desarrollador: desarrolladorG});
  });
  router.get("/estadisticas", (req, res) => {
    res.render("estadisticas", { version: versionG, desarrollador: desarrolladorG});
  });

  router.get("/covid-cliente", (req, res) => {
    res.render("covid-cliente", { version: versionG, desarrollador: desarrolladorG});
  });

  router.get("/acerca-de-cliente", (req, res) => {
    res.render("acerca-de-cliente", { version: versionG, desarrollador: desarrolladorG});
  });


  router.get("/index-cliente", (req, res) => {
    res.render("index-cliente", { version: versionG, desarrollador: desarrolladorG});
  });
  
  


  module.exports = router;