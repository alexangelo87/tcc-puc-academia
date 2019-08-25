const express = require('express');
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const { authorize } = require("../services/authService");
//get
router.get("/", authorize, clienteController.get);
//post
router.post("/", clienteController.post);
//auth
router.post("/auth", clienteController.postAuth);

module.exports = router;