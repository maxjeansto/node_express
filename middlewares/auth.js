import { getAllUsers } from "../controllers/user.js"
import { success,error } from "../utils/response.js"

export const auth = (req, res, next) => {
    const {secret} = req.headers
    const id = req.params.id
    const users = getAllUsers()
    const usersExisteAndauth = users.find((user) => user.id == id && user.secret == secret)
    console.log(usersExisteAndauth)
    if (!usersExisteAndauth) {
        error(res, 'Wrong Password!');

        
    } else {
        req.user = usersExisteAndauth
        next()
        
    }


    console.log(auth)
}