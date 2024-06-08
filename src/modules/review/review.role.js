import { roles } from "../../middleware/auth.js";



export const endpoints = {
    create:[roles.User],
    get:[roles.User],
    getAll:[roles.Admin]
}