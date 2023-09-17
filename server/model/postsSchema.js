import mongoose from "mongoose";


const postsSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likeCount : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const psotsMessage = mongoose.model("psotsMessage", postsSchema)
export default psotsMessage