const express = require('express');
const router = express.Router();
const clienteController = require("../controllers/clienteController");

//get
router.get("/", clienteController.get);
//post
router.post("/", clienteController.post);

module.exports = router;