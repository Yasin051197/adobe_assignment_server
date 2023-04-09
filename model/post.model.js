const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    content:{type:String,required:true},
    likes:{
        type: Number,
        min: 0,
        default: 0
      }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
  })

const Post=mongoose.model("post",postSchema)
module.exports={Post};