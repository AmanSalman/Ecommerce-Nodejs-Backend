import { roles } from "../../middleware/auth.js";



export const endpoints = {
    create : [roles.Admin],
    delete : [roles.Admin],
    update : [roles.Admin],
    getAll : [roles.Admin],
    getActive : [roles.Admin, roles.User],
    getDetails : [roles.Admin],
}