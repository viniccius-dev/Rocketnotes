const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UsersController {
    /* MAXIMUM 05 METHODS PER CLASS
        * index - GET to list multiple registries.
        * show - GET to display a specific registry.
        * create - POST to create a registry.
        * update - PUT to update a registry.
        * delete - DELETE to remove a registry.
     */

    async create(request, response) {
        const { name, email, password } = request.body
    
        /*response.send(`
            User: ${name}.
            Email: ${email}.
            Password: ${password}.
        `)

        if(!name) {
            throw new AppError("The name is required!")
        }
        
        response.status(201).json({ name, email, password })
        */


        if(checkUserExist) {
            throw new AppError("This email already in use.")
        }

        const hashedPassword = await hash(password, 8)

        return response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if(!user) {
            throw new AppError("User not found.")
        }

        const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("This email already in use.")
        }

        user.name = name ?? user.name //If "name" is different from null, consider it, otherwise keep the o value of "user.email"
        user.email = email ?? user.email

        if(password && !old_password){
            throw new AppError("You need to enter the old password to set the new password")
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new AppError("The old password entered is incorrect")
            }

            user.password = await hash(password,8)
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            update_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        )

        return response.status(200).json()
    }

}

module.exports = UsersController