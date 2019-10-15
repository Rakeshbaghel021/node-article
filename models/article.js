var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    likes:{
        type: Number
    },
    author :{
        type:Schema.Types.ObjectId,
        ref : 'User',
        required:true
    }
},{timestamps:true});

var Article = mongoose.model("Article",articleSchema);

module.exports = Article;
