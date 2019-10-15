var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /@/
    },
    password: {
        type: String
    }

},
    { timestamps: true })

    
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 15);
    console.log(this);
    next();
})
userSchema.methods.matchPassword = function(plainPassword) {
    // console.log(plainPassword, this.password)
    return bcrypt.compareSync(plainPassword, this.password);
}



module.exports = mongoose.model('User', userSchema)