import { roles } from "../../middleware/auth.js";



export const endpoints = {
    get:[roles.Admin],
    getAll:[roles.Admin],
    userData:[roles.User, roles.Admin]
}