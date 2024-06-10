const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload");

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const UsersController = require('../controllers/UsersController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'
const UserAvatarController = require('../controllers/UserAvatarController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

/*
function myMiddleware(request, response, next) {
    console.log("You went through the middleware")
    if(!request.body.isAdmin){
        return response.json({ message: "user unauthorized"})
    }

    next()
}
*/

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

/* Method GET
usersRoutes.get("/message", (request, response) => {
    response.send("Hello, world!")
})
*/

/* Route Params
usersRoutes.get("/message/:id/:user", (request, response) => {
    const { id, user } = request.params

    response.send(`
        Id message: ${id}.
        For the username: ${user}.
    `)
})
*/

/* Query Params 
usersRoutes.get("/users", (request, response) => {
    const { page, limit } = request.query
    
    response.send(`Page: ${page}. Show: ${limit}`)
})
*/

// Middleware for All routes from "usersRoutes"
//usersRoutes.use(myMiddleware)

usersRoutes.post("/", usersController.create) //If used, middleware for a specific route
usersRoutes.put("/", ensureAuthenticated,  usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes