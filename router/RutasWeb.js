const express = require('express');
const router = express.Router();
var versionG = "dfewdfew";
var desarrolladorG = "G.A.D.I";


router.get("/", (req, res) => { res.render("index", { version: versionG, desarrollador: desarrolladorG}
     
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
  
  
  router.get("/acerca-de", (req, res) => {
    res.render("acerca-de", { version: versionG, desarrollador: desarrolladorG});
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