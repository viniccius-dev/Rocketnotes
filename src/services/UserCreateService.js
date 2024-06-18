const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async execute({ name, email, password }) {
        const checkUserExist = await this.userRepository.findByEmail(email);

        if(checkUserExist) {
            throw new AppError("This email already in use.")
        }

        const hashedPassword = await hash(password, 8)

        await this.userRepository.create({ name, email, hashedPassword })
    }
}

module.exports = UserCreateService;