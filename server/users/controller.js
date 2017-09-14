/**
 * Created by Jens on 29-Dec-16.
 */
const async = require('async');
const config = require('../config');
const BaseController = require('../util/bases/basecontroller');
const Model = require('./model');

//FIXME adapt to project

class UserController extends BaseController {
    constructor(model = Model) {
        super(model);
    }

    addObj(data, callback) {
        this.addUser(data, callback);
    }

    addUser(data, callback) {
        if (data.secret && data.secret === config.jwt.auth.secret) {
            data['isSuperAdmin'] = true;
        } else {
            data['isSuperAdmin'] = false;
        }
        super.addObj(data, callback);
    }

    getFromEmail(email, include, callback) {
        this.model
            .find({email: new RegExp('^' + email + '$', 'i')})
            .select(include)
            .exec(function (err, user) {
                BaseController.getResult(err, user, callback);
            });
    }

    delete(jwt, superPwd, id, callback) {
        //FIXME needs super root password
        callback("TODO Implement", 401);
        // var self = this;
        // this.authenticator.verifyAdmin(jwt, function (err, res) {
        //     if (!err && res === true) {
        //         self.model
        //             .findByIdAndRemove(id)
        //             .exec(function (err, obj) {
        //                 if (!obj) {
        //                     obj = 404;
        //                 }
        //                 callback(err, obj);
        //             });
        //     } else {
        //         callback(err,401);
        //     }
        // });
    }

    handleValidationErrors(err) {
        let errorsAll = {};
        if (err.errors.password) {
            errorsAll['password'] = err.errors.password.message;
        }
        if (err.errors.email) {
            errorsAll['email'] = err.errors.email.message;
        }
        return errorsAll;
    }

    authenticate(email, password, callback) {
        let self = this;
        if (!email || !password) {
            callback(401, 401);
        } else {
            this.getFromEmail(email, '+password', function (err, users) {
                if (err || !isNaN(users)) {
                    BaseController.getResult(err, users, callback);
                } else {
                    var user = users[0];
                    self.authenticator.authenticate(user, password, function (err, result) {
                        BaseController.getResult(err, result, callback);
                    });
                }
            });

        }
    }
}

module.exports = UserController;