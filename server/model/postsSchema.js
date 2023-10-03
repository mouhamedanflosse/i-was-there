import mongoose from "mongoose";


const postsSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    name : String,
    tags : [String],
    selectedFile : String,
    likes : {
        type : [String],
        default : []
    },
    createdAt : {
        type : Date,
        default :  new Date(),
    }
})

const psotsMessage = mongoose.model("psotsMessage", postsSchema)
export default psotsMessage