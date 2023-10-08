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
    },
    comments : {
        type :[Object],
        default : []
    }
})

const postsMessage = mongoose.model("psotsMessage", postsSchema)
export default postsMessage