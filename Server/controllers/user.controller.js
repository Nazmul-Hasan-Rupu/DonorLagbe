const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.address = req.body.address;
    user.phoneNumber = req.body.phoneNumber;
    user.isAdmin = req.body.isAdmin;
    //user.roll =  req.body.roll;
   //user.
    user.save( (err, doc) =>{
        if(!err)
            res.send(doc);
        else{
            if(err.code == 11000)
                res.status(422).send(['Duplicate email address found']);
            else
                return next(err);
        }
    } );
}

module.exports.authenticate = (req, res, next) => {
    //call passport authentication
    passport.authenticate('local', (err, user, info) => {
        //error from passport middleware
        if(err) return res.status(400).json(err);
        //registered user
        else if(user) return res.status(200).json({"token": user.generateJwt()});
        //unknown user or wrong password
        else return res.status(404).json(info);

    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if(!user)
                return res.status(404).json({ status: false, message: "User record not found." });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['_id','fullName', 'email', 'isAdmin', 'address', 'phoneNumber']) });
        }
    );

}


module.exports.requesterInfo = (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else {
            console.log(`Error in retriving user profile`);
        }
    } )
}
