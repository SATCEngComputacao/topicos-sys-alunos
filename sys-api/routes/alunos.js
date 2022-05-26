const router = require("express").Router();

const alunosController = require("../controllers/alunos");
const upload = require("../upload");

// group => /alunos
router.get("/", alunosController.listAll);
router.get("/:id", alunosController.findOne);
router.post("/", upload.single("avatar"), alunosController.create);
router.put("/:id", upload.single("avatar"), alunosController.update);
router.delete("/:id", alunosController.destroy);

// exporting routes to use in app
module.exports = router;
