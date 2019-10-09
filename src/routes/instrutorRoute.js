const express = require('express');
const router = express.Router();
const instrutorController = require("../controllers/instrutorController");
const { authorize } = require("../services/authService");
//get
router.get("/", instrutorController.get);
router.post("/", instrutorController.post);

module.exports = router;