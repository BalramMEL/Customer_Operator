/** Here we create MongoDB Schema */

import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    avatar: String,
    email: String,
    phone: Number,
    gender: String,
    drone_shot: String,     
})

const Users = models.user || model("user", userSchema)
export default Users;