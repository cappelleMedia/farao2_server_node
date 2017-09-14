/**
 * Created by Jens on 19-Oct-16.
 */
const Authenticator = require('../../users/authenticator');

class BaseController {
    constructor(model) {
        this.model = model;
        this.authenticator = Authenticator;
    }

    addObj(data, callback) {
        let self = this;
        let validationErrors = "";
        let newObj = null;
        newObj = new this.model(data);
        newObj.save(function (err) {
            if (err) {
                if (err.name === 'ValidationError') {
                    validationErrors = self.handleValidationErrors(err);
                }
                return callback(err, 400, validationErrors);
            }
            callback(err, newObj, null);
        });
    }

    getAll(limit, skip, callback) {
        this.model
            .find()
            .skip(skip)
            .limit(limit)
            .exec(function (err, objects) {
                if (err) {
                    callback(err, 500);
                } else {
                    if (!objects || !objects.length) {
                        callback(err, 404);
                    } else {
                        callback(err, objects);
                    }
                }
            });
    }

    getOne(id, callback) {
        this.model
            .findById(id)
            .exec(function (err, obj) {
                BaseController.getResult(err, obj, callback);
            });
    }

    delete(jwt, id, callback) {
        var self = this;
        this.authenticator.verifyAdmin(jwt, function (err, res) {
            if (!err && res === true) {
                self.model
                    .findByIdAndRemove(id)
                    .exec(function (err, obj) {
                        if (!obj) {
                            obj = 404;
                        }
                        callback(err, obj);
                    });
            } else {
                callback(err,401);
            }
        });
    }

    //NO ROUTE FOR UPDATE?
    updateObj(id, updated, callback) {
        let self = this;
        this.getOne(id, function (err, found) {
            if (!isNaN(found)) {
                callback(err, found);
            } else {
                Object.assign(found, updated);
                self.addObj(found, function (err, result) {
                    let errors = null;
                    if (err) {
                        if (err.name === "ValidationError") {
                            errors = self.handleValidationErrors(err);
                        }
                    }
                    callback(err, result, errors);
                });
            }
        });
    }

    handleValidationErrors(err) {
        console.log('should be overridden by subclass');
        console.log(err);
        //should be overridden by all subs
        // throw TypeError('not implemented, should be implemented by subclass');
    }

    static getResult(err, value, callback) {
        if (!value) {
            callback(err, 404);
        } else {
            callback(err, value);
        }
    }
}

module.exports = BaseController;