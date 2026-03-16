import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({

    courseName:{
        type:String,
        required:true
    },

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const Course = mongoose.model("Course",courseSchema)

export default Course