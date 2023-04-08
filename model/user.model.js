const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true,minlength:1,maxlength:50},
    email:{type: String,required: true,unique: true,
        validate: {
          validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
        }},
    bio:{type:String,minlength:0,maxlength:200},
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false,
  })

const User=mongoose.model("user",userSchema)
module.exports={User};