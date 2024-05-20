const { Router } = require("express")

const tagsRoutes = Router()

const TagsController = require('../controllers/TagsController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes