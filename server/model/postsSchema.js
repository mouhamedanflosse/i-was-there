import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentText: String,
    creator: String,
    name : String,
    selectedFile : String,
    picutre : String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

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
        type : [commentSchema],
        default : []
    }
})

const psotsmessages = mongoose.model("psotsMessage", postsSchema)
export default psotsmessages