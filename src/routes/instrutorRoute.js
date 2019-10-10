const express = require('express');
const router = express.Router();
const instrutorController = require("../controllers/instrutorController");
const { authorize } = require("../services/authService");

router.get("/", instrutorController.get);
router.get("/:id", instrutorController.getById);
router.post("/", instrutorController.post);
router.put("/", instrutorController.put);
router.delete("/:id", instrutorController.delete);
router.delete("/deleteall", instrutorController.deleteAll);

module.exports = router;