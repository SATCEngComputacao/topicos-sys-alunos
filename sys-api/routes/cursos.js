const router = require("express").Router();

const cursosController = require("../controllers/cursos");

// group => /cursos
router.get("/", cursosController.listAll);
router.get("/:id", cursosController.findOne);
router.post("/", cursosController.create);
router.put("/:id", cursosController.update);
router.delete("/:id", cursosController.destroy);

// exporting routes to use in app
module.exports = router;
