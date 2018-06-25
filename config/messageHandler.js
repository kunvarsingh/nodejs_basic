var HttpStatus = require('http-status-codes');
var GlobalMessages = require('./constantMessages');

var errMessage = function (err) {
    var errMsg = {};
    if (err.name=='ValidationError'){
        var obj = [];
        for(field in err.errors){
            var key = err.errors[field].path.charAt(0).toUpperCase()+err.errors[field].path.slice(1);
            if(err.errors[field].properties.type == 'required'){
                var val = key+' is '+err.errors[field].kind+'.';
            }
            else if(err.errors[field].properties.type == 'unique'){
                var val = key+' has been already taken.'
            }
            else{
                var val = err.errors[field].message;
            }
            obj.push(val);
        }
    }
    errMsg['err']=GlobalMessages.CONST_MSG.fillAllFields;
    errMsg['status']=HttpStatus.NOT_FOUND;
    errMsg['msg']=obj;
    return errMsg;
}

exports.errMessage = errMessage;