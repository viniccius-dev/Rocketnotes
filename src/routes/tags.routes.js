const { Router } = require("express")

const tagsRoutes = Router()

const TagsController = require('../controllers/TagsController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'

const tagsController = new TagsController()

tagsRoutes.get("/:user_id", tagsController.index)

module.exports = tagsRoutes