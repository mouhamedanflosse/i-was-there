import mongoose from "mongoose"; 

const userSchema = mongoose.Schema({
    name : { type : String, required : true},
    password : { type : String},
    email : { type : String, required : true},
    picture : {type : String}
})
export default mongoose.model("user", userSchema)