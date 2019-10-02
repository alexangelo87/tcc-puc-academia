const express = require('express');
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const { authorize } = require("../services/authService");
//get
router.get("/",alunoController.get);
//get :id
router.get("/:id", alunoController.getById);
router.get("/users/:id", alunoController.getUserAluno);
//post
router.post("/", alunoController.post);
//put
router.put("/", alunoController.put);
//delete
router.delete("/", alunoController.delete);
//delete all
router.delete("/deleteall", alunoController.deleteAll);

module.exports = router;