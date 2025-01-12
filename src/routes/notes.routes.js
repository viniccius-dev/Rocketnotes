const { Router } = require("express")

const notesRoutes = Router()

const NotesController = require('../controllers/NotesController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index) //If used, middleware for a specific route
notesRoutes.post("/", notesController.create) //If used, middleware for a specific route
notesRoutes.get("/:id", notesController.show) 
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes