const express = require('express');
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const { authorize } = require("../services/authService");
//get
router.get("/", authorize, alunoController.get);
//post
router.post("/", alunoController.post);

module.exports = router;