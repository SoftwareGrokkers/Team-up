var bcrypt = require('bcrypt')


exports.encryptPassword = function(password){
    
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
exports.comparePassword = function(password, hash){
    
    return bcrypt.compareSync(password, hash);
};