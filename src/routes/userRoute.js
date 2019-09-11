const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const { authorize } = require("../services/authService");
//get
router.get("/", userController.get);
//post
router.post("/", userController.post);
//auth
router.post("/auth", userController.postAuth);

module.exports = router;