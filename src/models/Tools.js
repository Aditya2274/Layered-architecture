const mongoose=require('mongoose')
const toolSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Tool Name is required'],
        trim: true,
        maxlength: [100,'Tool name cannot exceed more than 100 characters']
    },
    description:{
        type:String,
        required: [true,'Tool Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category:{
        type: String,
        required: [true,'Tool category is required'],
        enum:{
            values: ['IDE','API_TOOL','VERSION_CONTROL','DATABASE','DESIGN','PRODUCTIVITY','OTHER'],
            message: 'invalid category'
        }
    },
    url:{
        type: String,
        required: [true,'Tool url is required'],
        validate:{
            validator: function(url){
                return /^https?:\/\/.+/.test(url);
            },
            message: 'Please provide a valid url'
        }
    },
    isPopular:{
        type: Boolean,
        default: false
    },
    tags:[{
        type: String,
        trim: true
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
},{
    timestamps: true,
    versionKey: false
});
toolSchema.index({category:1, isPopular:-1});
toolSchema.index({name: 1});

toolSchema.statics.findPopular = function(){
    return this.find({isPopular:true}).sort({createdAt:-1});
}
toolSchema.statics.findByCategory=function(){
    return this.find({category:-1}).sort({name:1});
}

const Tool=mongoose.model("Tool",toolSchema);
module.exports=Tool