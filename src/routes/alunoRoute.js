const express = require('express');
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const { authorize } = require("../services/authService");
//get
router.get("/", alunoController.get);
//get :id
router.get("/busca/:id", alunoController.getById);
router.get("/user", alunoController.getUserAluno);
//post
router.post("/", alunoController.post);

module.exports = router;