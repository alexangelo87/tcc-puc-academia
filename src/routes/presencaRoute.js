const express = require('express');
const router = express.Router();
const presencaController = require("../controllers/presencaController");
const { authorize } = require("../services/authService");
//get
router.get("/", presencaController.get);
//get
router.get("/:id", presencaController.getById);
//post
router.post("/", presencaController.post);
//put
router.put("/", presencaController.put);
//delete
router.delete("/:id", presencaController.delete);
//deleteAll
router.delete("/deleteall", presencaController.deleteAll);

module.exports = router;