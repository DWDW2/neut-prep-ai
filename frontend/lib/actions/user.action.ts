"use server"

import { connect } from "../db"
import { UserModel } from "../models/User.models"

export async function createUser(user:any){
    try {
        await connect()
        const newUser = new UserModel(user)
        await newUser.save()
        return JSON.stringify(newUser)
    } catch (error) {
        console.log(error)
    }
}