import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema({

    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

    rating:{
        type:Number,
        required:true
    },

    comment:{
        type:String
    },

    sentiment:{
        type:String
    }

},{timestamps:true})

const Feedback = mongoose.model("Feedback",feedbackSchema)

export default Feedback