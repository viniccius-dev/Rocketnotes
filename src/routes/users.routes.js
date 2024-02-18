const { Router } = require("express")

const usersRoutes = Router()

const UsersController = require('../controllers/usersController') //VScode pointing out non-existent error in the correct path which would be: '../controllers/UsersController'

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
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes