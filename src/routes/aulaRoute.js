const express = require('express');
const router = express.Router();
const aulaController = require("../controllers/aulaController");
const { authorize } = require("../services/authService");

router.get("/", aulaController.get);
router.get("/:id", aulaController.getById);
router.post("/", aulaController.post);
router.delete("/:id", aulaController.delete);
router.delete("/deleteall", aulaController.deleteAll);
router.put("/", aulaController.put);

module.exports = router;