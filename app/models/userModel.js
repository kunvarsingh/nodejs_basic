var mongoose = require('mongoose');
var Schema = mongoose.Schema;

     var userSchema = new Schema({
            UserName :               { type : String, required : true},
            Password  :               { type : String  },
            Email     :               { type : String },
            verificationToken  :      { type : String},
            resetPasswordToken  : { type: String},
            resetPasswordExpires: { type: Date},
            verifyEmail         :       {verificationStatus: {type: Boolean, default :false},
                                               Email: {type:String}
                                  },
            CreatedAt :               { type  : Date ,default : Date.now },
            IsDelete :                { type : Boolean , defaults : false }
   });

module.exports = mongoose.model('user',userSchema);
