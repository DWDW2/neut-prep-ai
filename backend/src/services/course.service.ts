import { UserModel as User } from "../models/user.models"

export default class CourseService {
    async generateLessons(userId: string){
        try{
            const roadmap = await User.find({_id: userId}).populate('roadmapId')
            console.log(roadmap)
        }catch(err){
            console.log(err)
        }
    }
}