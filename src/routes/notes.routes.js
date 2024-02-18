const { Router } = require("express")

const notesRoutes = Router()

const NotesController = require('../controllers/NotesController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'

const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create) //If used, middleware for a specific route
notesRoutes.get("/:id", notesController.show) //If used, middleware for a specific route

module.exports = notesRoutes