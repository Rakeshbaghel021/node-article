var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text:{
        type: String,
        required: true
    
    },
    articleId:{
        type: Schema.Types.ObjectId,
        ref :"Article",
        required: true
    },
    author :{
        type:Schema.Types.ObjectId,
        ref : 'User',
        required:true
    }
    
},{timestamps:true});

var Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;